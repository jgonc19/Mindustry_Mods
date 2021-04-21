/*
	Copyright (c) DeltaNedas 2020

	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program. If not, see <https://www.gnu.org/licenses/>.
*/

const ui = require("ui-lib/library");

const maxCount = 100;
const maxRand = 10;

const pos = new Vec2(-1, -1);

var dialog = null, button = null;
var spawning = UnitTypes.dagger, count = 1;
var team = Vars.state.rules.waveTeam;
// Default 2 tiles of random to the unit position
var rand = 2;

ui.onLoad(() => {
	dialog = new BaseDialog("$unit-factory");
	const table = dialog.cont;

	var posb;
	posb = table.button("Get coordinates", () => {
		dialog.hide();
		ui.click((screen, world) => {
			// We don't need sub-wu precision + make /js output nicer
			pos.set(Math.round(world.x), Math.round(world.y));
			posb.getLabel().text = "Clicked at " + Math.round(pos.x / 8)
				+ ", " + Math.round(pos.y / 8);
			dialog.show();
		}, true);
	}).width(200).get();

	table.row();

	/* Buttons */
	dialog.addCloseButton();
	
});

ui.addButton("unit-factory", spawning, () => {
	if (Vars.net.client()) {
		if (!Vars.player.admin) {
			Vars.ui.showInfoToast("You egg that would desync", 5);
			return;
		}
	}

	dialog.show();
}, b => {button = b.get()});
