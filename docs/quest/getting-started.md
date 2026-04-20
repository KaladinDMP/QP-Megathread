---
icon: lucide/rocket
---

# :lucide-rocket: Getting Started

!!! info "This page covers Quest 1, 2, 3, 3s, and Pro headsets. This is not a guide for Pico headsets — head to [r/PicoPiracy](https://reddit.com/r/PicoPiracy) for those."

There are a lot of words here. That's because if you want this to actually work you need to follow instructions exactly. Reading and understanding everything is the hardest part — once you know the process, the actual setup takes around 15 minutes. When you're done you'll have access to thousands of VR games and apps, all through high-speed direct download, with games installed on your headset automatically.

## FAQ

???+ question "Will I be banned or bricked for pirating games?"
    No. As of today not a single person has been banned or punished in any way for piracy on the Quest platform. You are safe to pirate as much as you want, while connected to WiFi, all on your main Meta account. Purchased and pirated games can coexist on the same account.

??? question "Should I use a second account for piracy?"
    If you want piracy to be simple, only have one account on your headset. No second account for pirated games, no extra profiles. While it is possible to pirate on a Quest with multiple accounts, it's way more of a pain. Unless you want to learn a bunch of ADB commands and spend hours per game instead of minutes, stick to a single account.

??? question "What firmware do I need? Can I do system updates?"
    You don't need any specific firmware version. You are safe to update, and since many updates have drastically improved things like passthrough on the Quest 3 and 3s, we encourage it. We recommend staying on the latest version of Quest software but not signing up for the PTC (Public Test Channel). If something changes that affects piracy, the community will spot it long before it hits the regular release channel.

??? question "What about free trials and Quest+ games?"
    Do NOT use free trials of games on the Meta store if you intend to pirate those games. If you use a free trial it gets tied to your account, and attempting to pirate that game will give you an antipiracy warning. This is different from game demos, which are separate listings on the store and are safe to use. Quest+ games are the same deal, they will be tied to Quest+ if you pirate them without renaming the packagename.

    If you already used a free trial: You can either buy the game, factory reset your headset with a new account, or use a tool like APC (Automagic Package Changer), APKognito, or Phunk on your PC to rename and reinstall the game under a different package name.

??? question "What games can I get?"
    Pretty much all of them, around 2000+ titles. A few exceptions exist for games with uncracked protections or online-only games with server-side account verification.

??? question "Can I play multiplayer?"
    Sometimes. A surprising number of Quest games have multiplayer that works on pirated copies, but this can change with any update. You typically need to be on the most recent version of a game for multiplayer to work, so there may be a delay after updates. There's no way for staff to track every game, so community help keeping multiplayer lists updated is appreciated.

??? question "Should I update?"
    Yes. Games may stop working if you don't update your headset. Unless you wish to never update and stay offline forever, update your headset.
## Prerequisites

### Enabling Developer Mode

Developer mode is required to sideload any content onto your Quest headset. This is the first step.

1. Follow the [official Meta guide](https://developers.meta.com/horizon/documentation/android-apps/enable-developer-mode/) to enable developer mode on your headset.
   You'll need a Meta developer account — the guide walks you through creating one if you don't have it.
1. Once enabled, your headset will allow USB debugging and sideloaded app installs.
!!! tip "Developer mode only needs to be enabled once. It persists across reboots and updates."

### USB Drivers & Connection
You'll need proper USB drivers and a decent cable to connect your Quest to your PC.

=== "Windows"

    1. Download and install the [Quest USB Drivers](https://developers.meta.com/horizon/downloads/package/oculus-adb-drivers/) on your PC.
        - Extract the zip, then right click on `install.inf` and click **Install**.
=== "Linux"
    1. Install the android `udev` rules package for your distribution.
        - **:simple-archlinux: Arch/CachyOS/Manjaro**
        ```bash
        sudo pacman -S android-udev
        ```
        - **:simple-debian: Debian/Ubuntu/Mint**
         ```bash
         sudo apt install android-udev-rules
         ```
        - **:simple-fedora: Fedora**
        ```bash
        sudo dnf install android-tools
        ```

### Installing Rookie Sideloader

[Rookie Sideloader](https://github.com/VRPirates/rookie/releases) is a Windows PC application. If you want the very best experience and easiest time, using a Windows PC is the way to do it. It doesn't have to be a powerful gaming PC — anything relatively modern will work.

For Mac and Linux users, check out [ApprenticecVrSrc](https://github.com/mula-bb/apprenticeVrSrc) and other tools on the [tools page](#). Some solutions rely on torrents with slower speeds and manual installs. If you plan to get and use a lot of games, a cheap used Windows PC plus Rookie will save you massive amounts of time vs. torrents and manual installations. Also check out [VRSideForge](https://github.com/yGuilhermy/VRSideForge) for a torrent-based approach with a built-in sideloader.

## Setup

Make sure you've completed Developer Mode and USB Drivers setup above.

=== "Windows"

    1. Download Rookie from the [Github](https://github.com/nerdunit/androidsideloader/releases/latest).
    1. You may get a browser or antivirus warning — this is a false positive. See the Rookies Dev Safety Guide for more details.
    1. Move the Rookie exe to a folder like `C:\RSL\Rookie`.
    1. Download the [Public Server JSON](https://github.com/CrazyScamp/Rookie-3.2-Setup/releases/download/public.json/public.json) file and place it next to the exe.
    1. Connect your headset via USB and allow USB debugging.
    1. Double-click `AndroidSideloader.exe` to run Rookie.
    
    That's it! Rookie will download what it needs and show you a list of available games. Double-click a game name and Rookie will download it, unzip it, and install it on your headset automatically. You'll see progress at the bottom — "Downloading", then "Wait for Install", then "Installing APK", then "Moving OBB". Have patience with larger games (some can be 30GB+). A "Success" message means you're ready to play.
=== "Linux"
    1. Download [Apprenticevrsrc](https://github.com/KaladinDMP/apprenticeVrSrc).
    1. Open **Settings** > **Set Public Server JSON**
    1. Enter the [current JSON](public-json.md).
    1. Connect your headset and allow USB debugging.

    Click a game in the list, then **Download** to download and install a game.

    !!! failure "My device isn't showing up!"
        Make sure you added the udev rules in the [previous section](#__tabbed_1_2).

## Finding Sideloaded Games

Anything you install that isn't from the Meta Store won't show up in the normal library. Here's how to find your sideloaded games:

- **Unknown Sources:** The Library app on your headset has an "Unknown Sources" section. Depending on your headset version it's either in a dropdown menu or an icon on the left side of the Library app. This works, but it's a plain text list and some games may appear under different names (e.g., Batman shows as "Manta").

- **Use a Launcher (Recommended):** Launchers are apps that replace the default Library view, showing all your pirated and purchased games together with cover art, sorting, and organization. The first few items listed in Rookie are launchers — install one and pin it to your Quest main menu bar for one-click access to everything.

!!! success "Next Steps"
    - **Find games:** Check the [sources page](sources.md) for game sources (Telegram and non-Telegram).
    - **Explore tools:** See the [tools](tools.md) page for sideloader apps and alternatives to Rookie.
    - **Server config:** Visit the [public JSON](public-json.md) page if you need to configure a server for Rookie or ApprenticeVR.
    - **PCVR gaming:** If you also game on PC, check out the [PCVR sources](../pcvr/sources.md) page.
