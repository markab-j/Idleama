# How to Use Idleama

Thank you for using Idleama! This document provides basic instructions on how to use Idleama and how to add character packs.

## Adding Your Own Character Pack

The main feature of Idleama is the ability to add your own custom characters to your desktop. Follow the guide below to add your own character.

### 1. Prepare the Pack Folder

First, you need to create a pack folder for the character you want to add.

1.  Navigate to your **`My Documents`** folder.
2.  Find and enter the `Idleama` folder. (If the folder doesn't exist, try running the program once and check again.)
3.  Create a **new folder** inside the `characterpacks` folder. The name of this folder will become the pack's ID (e.g., `MyCharacter`).

    ```
    My Documents
    └── Idleama
        └── characterpacks
            └── MyCharacter  <-- New folder
    ```

### 2. Prepare the Sprite Image

A **Sprite** is a single image file where the character's movements are drawn in sequence.

*   You need to prepare an image file (`sprite.png`) with the character's various actions (idling, walking, etc.) arranged in designated cells.
*   Place the prepared `sprite.png` file into the `MyCharacter` folder you just created.

#### Important: Sprite Sheet Order

Each row in the sprite sheet must be drawn according to a specific animation order. If you don't follow this order, the animation may look awkward.

*   **For `8axis` type (10 rows total)**
    1.  `IDLE_DOWN` (Standing, facing front)
    2.  `IDLE_DOWN_LEFT` (Standing, facing bottom-left)
    3.  `IDLE_LEFT` (Standing, facing left)
    4.  `IDLE_UP_LEFT` (Standing, facing top-left)
    5.  `IDLE_UP` (Standing, facing back)
    6.  `WALK_DOWN` (Walking, facing front)
    7.  `WALK_DOWN_LEFT` (Walking, facing bottom-left)
    8.  `WALK_LEFT` (Walking, facing left)
    9.  `WALK_UP_LEFT` (Walking, facing top-left)
    10. `WALK_UP` (Walking, facing back)

*   **For `4axis` type (6 rows total)**
    1.  `IDLE_DOWN` (Standing, facing front)
    2.  `IDLE_LEFT` (Standing, facing left)
    3.  `IDLE_UP` (Standing, facing back)
    4.  `WALK_DOWN` (Walking, facing front)
    5.  `WALK_LEFT` (Walking, facing left)
    6.  `WALK_UP` (Walking, facing back)


### 3. Create the `pack.json` File

`pack.json` is a configuration file that contains information about the new character.

1.  In your `MyCharacter` folder, right-click and select **New > Text Document**.
2.  Rename the file to `pack.json`. (The extension must change from `.txt` to `.json`.)
3.  Open the `pack.json` file with a text editor like Notepad and use the content below as a base.

#### `pack.json` Basic Structure

```json
{
    "meta": {
        "name": "MyFirstCharacter",
        "author": "Your Name",
        "description": "This is the first character I made.",
        "version": "1.0.0"
    },
    "assets": {
        "character": {
            "name": "My First Character"
        },
        "sprite": {
            "src": "sprite.png",
            "columns": 4,
            "rows": 10,
            "type": "8axis",
            "anims": {
                "IDLE_DOWN": { "frameCount": 4 },
                "IDLE_DOWN_LEFT": { "frameCount": 4 },
                "IDLE_LEFT": { "frameCount": 4 },
                "IDLE_UP_LEFT": { "frameCount": 4 },
                "IDLE_UP": { "frameCount": 4 },
                "WALK_DOWN": { "frameCount": 4 },
                "WALK_DOWN_LEFT": { "frameCount": 4 },
                "WALK_LEFT": { "frameCount": 4 },
                "WALK_UP_LEFT": { "frameCount": 4 },
                "WALK_UP": { "frameCount": 4 }
            }
        }
    }
}
```

#### Important: `meta.name`
`meta.name` is the **unique ID** for the pack. It must be an English name that does not overlap with other packs (e.g., `MyCoolDragon`, `CheeseCat_v2`).
`assets.character.name` is the character's name that will actually be displayed in the program. This value can be the same as other packs.

#### Character Animation Type (`type`) Details

The character's behavior and the required content for `anims` change depending on the `assets.sprite.type` value. There are four types in total.

##### 1. `STATIC`
*   **Description**: Displays a single, static image without any movement.
*   **`anims`**: This type does not require the `anims` property.
*   **`pack.json` Example**:
    ```json
    "sprite": {
        "src": "sprite.png",
        "columns": 1,
        "rows": 1,
        "type": "STATIC"
    }
    ```

##### 2. `IDLE_ONLY`
*   **Description**: The character only repeats an idle animation (like breathing) in place. Suitable for characters like slimes or floating beings.
*   **`anims`**: Defines only the `IDLE` animation.
*   **`pack.json` Example**:
    ```json
    "sprite": {
        "src": "sprite.png",
        "columns": 4,
        "rows": 1,
        "type": "IDLE_ONLY",
        "anims": {
            "IDLE": { "frameCount": 4 }
        }
    }
    ```

##### 3. `FOUR_AXIS`
*   **Description**: The character walks or idles in four directions: up, down, left, and right.
*   **`anims`**: Defines `IDLE` and `WALK` animations for `DOWN`, `LEFT`, and `UP` directions. The right direction is automatically handled by flipping the left direction horizontally.
*   **`pack.json` Example**:
    ```json
    "sprite": {
        "src": "sprite.png",
        "columns": 4,
        "rows": 6,
        "type": "FOUR_AXIS",
        "anims": {
            "IDLE_DOWN": { "frameCount": 4 },
            "IDLE_LEFT": { "frameCount": 4 },
            "IDLE_UP": { "frameCount": 4 },
            "WALK_DOWN": { "frameCount": 4 },
            "WALK_LEFT": { "frameCount": 4 },
            "WALK_UP": { "frameCount": 4 }
        }
    }
    ```

##### 4. `EIGHT_AXIS`
*   **Description**: The character walks or idles in eight directions, including diagonals. This provides the most natural movement.
*   **`anims`**: Defines `IDLE` and `WALK` animations for `DOWN`, `DOWN_LEFT`, `LEFT`, `UP_LEFT`, and `UP` directions. The right-side directions are automatically handled by flipping the left-side directions horizontally.
*   **`pack.json` Example**:
    ```json
    "sprite": {
        "src": "sprite.png",
        "columns": 4,
        "rows": 10,
        "type": "EIGHT_AXIS",
        "anims": {
            "IDLE_DOWN": { "frameCount": 4 },
            "IDLE_DOWN_LEFT": { "frameCount": 4 },
            "IDLE_LEFT": { "frameCount": 4 },
            "IDLE_UP_LEFT": { "frameCount": 4 },
            "IDLE_UP": { "frameCount": 4 },
            "WALK_DOWN": { "frameCount": 4 },
            "WALK_DOWN_LEFT": { "frameCount": 4 },
            "WALK_LEFT": { "frameCount": 4 },
            "WALK_UP_LEFT": { "frameCount": 4 },
            "WALK_UP": { "frameCount": 4 }
        }
    }
    ```

### 4. Apply the Pack

1.  Click the **Pack Management button** in the Idleama program.
2.  Check if the pack you just added appears in the list and select it.
3.  Once applied, you can select the new character pack!
