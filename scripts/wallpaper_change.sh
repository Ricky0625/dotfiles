#!/bin/bash

wallpaper_symlink_path="$HOME/.config/sway/.wallpaper"
wallpaper_path="$1"

ln -sf "$wallpaper_path" "$wallpaper_symlink_path"
swww img "$wallpaper_symlink_path" --transition-type wipe --transition-angle 30 --transition-fps 60

