#test -f ~/.profile; and source ~/.profile

# === env variables ===
set -gx EDITOR nvim
set -gx EDITOR zen-browser
set -gx TERM ghostty

set STARSHIP_CONFIG '~/.config/starship/starship.toml'
set -x GTK_IM_MODULE fcitx
set -x QT_IM_MODULE fcitx
set -x XMODIFIERS "@im=fcitx"
set -x INPUT_METHOD fcitx
set -x SDL_IM_MODULE fcitx


# === alias-like functions ===
function nv
	nvim $argv
end

function cd
	z $argv
end

function refish
	source ~/.config/fish/config.fish
end

# === abbreviation (expand only) ===
abbr -a lg "lazygit"
abbr -a ff "fastfetch"

# === enable 256-color support ===
set -gx TERM screen-256color

# === prompt ===
if command -v starship > /dev/null
	starship init fish | source
end

if command -v zoxide > /dev/null
	zoxide init fish | source
end
