
###-begin-my-file-completion-###
#
# my-file command completion script
#
# Installation: my-file completion >> ~/.bashrc  (or ~/.zshrc)
# Or, maybe: my-file completion > /usr/local/etc/bash_completion.d/my-file
#

_my_file_completion() {
	local BIN_NAME CURRENT_WORD LAST_WORD;

	BIN_NAME="$1"; # my-file
    CURRENT_WORD="$2";
    LAST_WORD="$3";

    COMPREPLY=();

	if [[ -z `which $BIN_NAME` ]]; then return; fi

	if [[ "$CURRENT_WORD" == -* ]]; then
        COMPREPLY=( $( compgen -W "$($BIN_NAME --complete-opts)" -- $CURRENT_WORD ) );
	else
        COMPREPLY=( $( compgen -W "$($BIN_NAME --complete-list)" -- $CURRENT_WORD ) );
	fi
}

complete -F _my_file_completion "my-file";
###-end-my-file-completion-###
