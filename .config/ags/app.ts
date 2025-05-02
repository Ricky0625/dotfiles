import { App } from "astal/gtk4"
import style from "./style.scss"
//import Bar from "./widget/Bar"
import { WallPicker } from "./widget/WallPicker";

App.start({
    css: style,
    main() {
        //App.get_monitors().map(Bar);
        WallPicker();
    },
})
