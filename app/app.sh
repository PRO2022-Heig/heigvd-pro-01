#!/bin/bash

# from https://stackoverflow.com/questions/59895/how-can-i-get-the-source-directory-of-a-bash-script-from-within-the-script-itsel
_SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

function _show_and_run_cmd {
    echo -e "Running> \e[32m$1\e[0m"
    $1
    echo
}

function install_backend {
    echo " - Running the 'composer setup' on the backend directory"
    _show_and_run_cmd "composer setup --working-dir=$_SCRIPT_DIR/backend"
}

function install_frontend {
    echo " - Installing dependencies"
    _show_and_run_cmd "npm install --prefix $_SCRIPT_DIR/frontend"

    # TODO: skip by default?
    echo "Base href used in a meta of the html (https://www.w3schools.com/tags/att_base_href.asp)."
    echo "Use default (press enter) for the Vagrant machine or if you do not know."
    echo -n "Base href  [default: '/', must be URI friendly] : "
    read BASE_HREF

    if [ -z $BASE_HREF ]
    then
        BASE_HREF="/"
    fi

    echo " - Compiling"
    _show_and_run_cmd "npm run build --prefix $_SCRIPT_DIR/frontend -- --base-href ${BASE_HREF}"
}

function install_both {
    echo -e "\e[34m\e[1m -> Installing \e[4mBACKEND\e[0m"
    install_backend

    echo -e "\e[34m\e[1m -> Installing \e[4mFRONTEND\e[0m"
    install_frontend
}

function install_entry {
    case $1 in
        $_CMD_INSTALL_BACK)
            install_backend
        ;;

        $_CMD_INSTALL_FRONT)
            install_frontend
        ;;

        $_CMD_INSTALL_ALL)
            install_both
        ;;

        *)
            echo -e "\e[31mNo option found!\e[0m"
            echo -e "Execute '\e[3m$0 help\e[0m' to get help."
        ;;
    esac
}

_CMD_INSTALL="install"
_CMD_INSTALL_BACK="backend"
_CMD_INSTALL_FRONT="frontend"
_CMD_INSTALL_ALL="all"
_CMD_HELP="help"
_CMD_UPDATE="update"

function show_help {
    echo -e "
usage: \e[3m$0 <command>\e[0m
where:
    <command>:
        \e[1m$_CMD_INSTALL\e[0m:    install dependencies and initialize a folder for usage.
                    It needs a second argument:
                        \e[1m$_CMD_INSTALL_BACK\e[0m:    Install only the backend part
                        \e[1m$_CMD_INSTALL_FRONT\e[0m:   Install only the frontend part
                        \e[1m$_CMD_INSTALL_ALL\e[0m:        Install both backend and frontend

                    example: \e[3m$0 install both\e[0m
        \e[1m$_CMD_HELP\e[0m:       Show this.
        \e[1m$_CMD_UPDATE\e[0m:     Currently, this is the same as \e[1m$_CMD_INSTALL\e[0m action.
    "
}

case $1 in
    $_CMD_INSTALL | $_CMD_UPDATE)
        install_entry $2
    ;;

    $_CMD_HELP)
        show_help
    ;;

    *)
        echo -e "\e[31mNo command found!\e[0m"
        show_help
    ;;
esac
