const Applet = imports.ui.applet;
const Util = imports.misc.util;

function MyApplet(orientation, panel_height, instance_id) {
    this._init(orientation, panel_height, instance_id);
}

MyApplet.prototype = {
    __proto__: Applet.IconApplet.prototype,

    _init: function(orientation, panel_height, instance_id) {
        Applet.IconApplet.prototype._init.call(this, orientation, panel_height, instance_id);

        this.set_applet_icon_name("input-mouse-symbolic");
        this.set_applet_tooltip(_("Toggle Keypad Mouse Control"));
    },

    on_applet_clicked: function() {
        Util.spawnCommandLine("sh -c 'if gsettings get org.cinnamon.desktop.a11y.keyboard mousekeys-enable | grep -q false; then " +
                "gsettings set org.cinnamon.desktop.a11y.keyboard mousekeys-enable true; " +
                "notify-send -u normal \"Keypad Mouse\" \"Keypad mouse ON\"; " +
                "else " +
                "gsettings set org.cinnamon.desktop.a11y.keyboard mousekeys-enable false; " +
                "notify-send -u normal \"Keypad Mouse\" \"Keypad mouse OFF\"; " +
                "fi'"
        );
        
    }
};

function main(metadata, orientation, panel_height, instance_id) {
    return new MyApplet(orientation, panel_height, instance_id);
}
