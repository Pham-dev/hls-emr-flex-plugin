# --------------------------------------------------------------------------------------------------------------
# FOR DEVELOPER USE ONLY!!!
# --------------------------------------------------------------------------------------------------------------

# ---------- acquire twilio credentials from environment variables
# when below 2 variables are set, it will be the 'active' profile of twilio cli
ifndef TWILIO_ACCOUNT_SID
$(info Lookup your "ACCOUNT SID" at https://console.twilio.com/)
$(info execute in your terminal, 'export TWILIO_ACCOUNT_SID=AC********************************')
$(error TWILIO_ACCOUNT_SID environment variable is not set)
endif

ifndef TWILIO_AUTH_TOKEN
$(info Lookup your "AUTH TOKEN" at https://console.twilio.com/)
$(info execute in your terminal, 'export TWILIO_AUTH_TOKEN=********************************')
$(info TWILIO_AUTH_TOKEN environment variable is not set)
endif


# ---------- variables
BLUEPRINT_NAME   := $(shell basename `pwd`)
PLUGIN      		 := $(shell jq --raw-output '.name' package.json)
PLUGIN_VERSION   := $(shell jq --raw-output '.version' package.json)
GIT_REPO_URL     := $(shell git config --get remote.origin.url)
INSTALLER_NAME   := hls-flex-plugin
CPU_HARDWARE     := $(shell uname -m)
DOCKER_EMULATION := $(shell [[ `uname -m` == "arm64" ]] && echo --platform linux/amd64)
$(info ================================================================================)
$(info BLUEPRINT_NAME     : $(BLUEPRINT_NAME))
$(info GIT_REPO_URL       : $(GIT_REPO_URL))
$(info INSTALLER_NAME     : $(INSTALLER_NAME))
$(info CPU_HARDWARE       : $(shell uname -m))
$(info DOCKER_EMULATION   : $(DOCKER_EMULATION))
$(info TWILIO_ACCOUNT_NAME: $(shell twilio api:core:accounts:fetch --sid=$(TWILIO_ACCOUNT_SID) --no-header --properties=friendlyName))
$(info TWILIO_ACCOUNT_SID : $(TWILIO_ACCOUNT_SID))
$(info TWILIO_AUTH_TOKEN  : $(shell echo $(TWILIO_AUTH_TOKEN) | sed 's/./*/g'))
$(info PLUGIN             : $(PLUGIN))
$(info PLUGIN_VERSION     : $(PLUGIN_VERSION))
$(info ================================================================================)


targets:
	@echo ----- available make targets:
	@grep '^[A-Za-z0-9\-]*:' Makefile | cut -d ':' -f 1 | sort


installer-build-github:
	docker build --build-arg TWILIO_ACCOUNT_SID={ACCOUNT_SID} --build-arg TWILIO_AUTH_TOKEN={AUTH_TOKEN} \
	--build-arg REACT_APP_BACKEND_URL={REACT_APP_BACKEND_URL} --no-cache $(DOCKER_EMULATION) \
	--tag $(INSTALLER_NAME) $(GIT_REPO_URL)#main


installer-build-local:
	docker build --build-arg TWILIO_ACCOUNT_SID={ACCOUNT_SID} --build-arg TWILIO_AUTH_TOKEN={AUTH_TOKEN} \
	--build-arg REACT_APP_BACKEND_URL={REACT_APP_BACKEND_URL} --no-cache $(DOCKER_EMULATION) \
	--tag $(INSTALLER_NAME) --no-cache .


installer-run:
	docker run --name $(INSTALLER_NAME) --rm -p 3000:3000 -p 3001:3001 \
	-e ACCOUNT_SID={ACCOUNT_SID} -e AUTH_TOKEN={AUTH_TOKEN} -it $(INSTALLER_NAME)


# installer-open:
# 	@while [[ -z $(curl --silent --head http://localhost:3000/installer/index.html) ]]; do \
#       sleep 2 \
#       echo "installer not up yet..." \
#     done
# 	open -a "Google Chrome" http://localhost:3000/installer/index.html


get-all-plugins:
	@twilio flex:plugins:list:plugins --json | jq .


get-active-plugins:
	@twilio flex:plugins:describe:release --active


get-plugin-sid:
	$(eval PLUGIN_SID :=  $(shell twilio flex:plugins:list:plugins --json \
	| jq --raw-output '.[] | select(.friendlyName == "$(PLUGIN)") | .sid'))
	@if [[ ! -z "$(PLUGIN_SID)" ]]; then \
      echo "PLUGIN_SID=$(PLUGIN_SID)"; \
    else \
	  echo "$@: Plugin sid could not be found or Plugin is not deployed!!! aborting..."; \
	fi
	@[[ ! -z "$(PLUGIN_SID)" ]]


get-plugin:
	$(eval PLUGIN_OBJECT := $(shell twilio flex:plugins:list:plugins --json \
	| jq --raw-output '.[] | select(.friendlyName == "$(PLUGIN)")'))


get-all-versions:
	@twilio flex:plugins:list:plugin-versions --name $(PLUGIN)


deploy-and-release:
	@twilio flex:plugins:deploy --patch --changelog "Deployed from Makefile" --description "TEST Deployment from Makefile"
	$(eval CURRENT_VERSION := $(shell jq --raw-output '.version' package.json))
	echo "CURRENT_VERSION=$(CURRENT_VERSION)";
	@twilio flex:plugins:release --plugin $(PLUGIN)@$(CURRENT_VERSION) --description "Released from Makefile"


disable-plugin:
	@twilio flex:plugins:release --disable-plugin $(PLUGIN) --description "Plugin Disabled Via Makefile"


start:
	@twilio flex:plugins:start
	@echo starting $(PLUGIN)


# This one starts the plugin with all remote plugins
start-all:
	@twilio flex:plugins:start --include-remote
	@echo starting $(PLUGIN)


# separate make target needed to be abortable
confirm-delete:
	@read -p "Delete $(SERVICE_NAME) service? [y/n] " answer && [[ $${answer:-N} = y ]]
