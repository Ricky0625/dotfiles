import { exec, execAsync, Variable } from "astal";
import { App, Astal, Gdk, Gtk, Widget } from "astal/gtk4";

interface WallpaperMetadata {
    name: string;
    path: string;
}

const WIDGET_NAME = "wallpicker";
const WALLPAPER_DIR = `/home/ricky/Wallpapers`;
const WALLPAPER_SYMLINK = `/home/ricky/.config/sway/.wallpaper`

const wallpapers = Variable<WallpaperMetadata[]>([])
const currentPreview = Variable<string>("")

function getWallpaperName(path: string): string {
    const splitted = path.split("/").filter(x => x);
    const filename = splitted[splitted.length - 1]

    return (filename.split("."))[0]
        .split(/[^a-zA-Z0-9]+/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

function getCurrentWallpaper() {
    execAsync(`readlink -f ${WALLPAPER_SYMLINK}`).then(output => {
        currentPreview.set(output)
    }).catch(err => console.log(err))
}

function getWallpaperMetadatas() {
    execAsync(`find ${WALLPAPER_DIR} -type f`).then(output => {
        const paths = output.split("\n").filter(x => x)
        wallpapers.set(paths.map(path => {
            return {
                name: getWallpaperName(path),
                path: path,
            }
        }))
    }).catch(err => console.log(err))
}

function setWallpaper(path: string) {
    exec(`/home/ricky/.config/scripts/wallpaper_change.sh ${path}`)
}

function hide() {
    App.get_window(WIDGET_NAME)!.hide()
}

const WallpaperSelectionButton = (metadata: WallpaperMetadata) => Widget.Button({
    label: metadata.name,
    halign: Gtk.Align.START,
    onFocusEnter: () => {
        currentPreview.set(metadata.name)
    },
    onClicked: () => {
        setWallpaper(metadata.path);
        hide();
    }
})


const WallpaperSelections = () => Widget.Box({
    visible: true,
    vertical: true,
    children: wallpapers(metadatas => metadatas.map(metadata => WallpaperSelectionButton(metadata)))
})


export const WallPicker = () => {

    // load wallpapers (path only)
    getCurrentWallpaper()
    console.log(currentPreview())
    getWallpaperMetadatas()

    return Widget.Window({
        name: WIDGET_NAME,
        namespace: WIDGET_NAME,
        cssClasses: ["wallpicker"],
        application: App,
        exclusivity: Astal.Exclusivity.EXCLUSIVE,
        keymode: Astal.Keymode.EXCLUSIVE,
        onKeyPressed: (_, keycode) => {
            if (keycode === Gdk.KEY_Escape) {
                hide()
            }
        },
        child: Widget.Box({
            visible: true,
            vertical: true,
            children: [
                Widget.Label({
                    label: currentPreview()
                }),
                // Wallpaper preview
                //Widget.Image({
                //
                //}),

                // selections
                WallpaperSelections()
            ]
        })

    })
}
