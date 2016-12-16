var updateCustomButtons, autoToggle;

(function() {
  updateCustomButtons = render;
  autoToggle = toggleAutotrimpsMenu;

  var oldToggleSettingsMenu = toggleSettingsMenu;
  toggleSettingsMenu = function() {
    if (closeAllSettings() !== 'game') {
      oldToggleSettingsMenu();
    }
  };

  // init
  var autoSettings;
  (function() {
    //create the AutoTrimps Script button
    var newItem = document.createElement("TD");
    newItem.appendChild(document.createTextNode("AutoTrimps"));
    newItem.setAttribute("class", "btn btn-default");
    newItem.setAttribute("onclick", "autoToggle()");
    var settingbarRow = document.getElementById("settingsTable").firstElementChild.firstElementChild;
    settingbarRow.insertBefore(newItem, settingbarRow.childNodes[10]);

    var settingsRow = document.getElementById("settingsRow");
    autoSettings = document.createElement('div');
    autoSettings.setAttribute('style', 'display: none; max-height: 96vh;overflow: auto;');
    settingsRow.appendChild(autoSettings);
  })();

  function closeAllSettings() {
    if (game.options.displayed) {
      oldToggleSettingsMenu();
      return 'game';
    }

    if (document.getElementById('graphParent').style.display === 'block') {
      document.getElementById('graphParent').style.display = 'none';
      return 'graph';
    }

    if (autoSettings.style.display === 'block') {
      autoSettings.style.display = 'none';
      return 'auto';
    }
  }

  function toggleAutotrimpsMenu() {
    if (closeAllSettings() !== 'auto') {
      autoSettings.style.display = autoSettings.style.display === 'block' ? 'none' : 'block';
    }
  }

  function render() {

  }
})();