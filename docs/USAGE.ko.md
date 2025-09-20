# Idleama 사용법

Idleama를 사용해주셔서 감사합니다! 이 문서는 Idleama의 기본 사용법과 캐릭터 팩을 추가하는 방법을 안내합니다.

## 나만의 캐릭터 팩 추가하기

Idleama의 가장 큰 특징은 사용자가 직접 만든 캐릭터를 바탕화면에 추가할 수 있다는 점입니다. 아래의 가이드를 따라 여러분만의 캐릭터를 추가해보세요.

### 1. 팩 폴더 준비하기

먼저, 추가하고 싶은 캐릭터의 팩 폴더를 만들어야 합니다.

1.  **`내 문서`** (또는 `My Documents`) 폴더로 이동합니다.
2.  `Idleama` 폴더를 찾아 들어갑니다. (만약 폴더가 없다면 프로그램을 한 번 실행 후 다시 확인해보세요.)
3.  `characterpacks` 폴더 안에 **새 폴더**를 만듭니다. 이 폴더의 이름이 곧 팩의 ID가 됩니다 (예: `MyCharacter`).

    ```
    내 문서
    └── Idleama
        └── characterpacks
            └── MyCharacter  <-- 새로 만든 폴더
    ```

### 2. 스프라이트 이미지 준비하기

**스프라이트(Sprite)**란, 캐릭터의 움직임을 한 장의 이미지에 순서대로 그려놓은 것을 말합니다.

*   캐릭터의 여러 동작(가만히 있기, 걷기 등)을 정해진 칸에 맞게 배열한 이미지 파일(`sprite.png`)을 준비해야 합니다.
*   준비된 `sprite.png` 파일을 아까 만든 `MyCharacter` 폴더 안에 넣습니다.

#### 중요: 스프라이트 시트 순서

스프라이트 시트의 각 가로줄(Row)은 정해진 애니메이션 순서에 따라 그려져야 합니다. 이 순서를 지키지 않으면 애니메이션이 어색하게 보일 수 있습니다.

*   **`8axis` 타입의 경우 (총 10줄)**
    1.  `IDLE_DOWN` (정면 보고 서기)
    2.  `IDLE_DOWN_LEFT` (왼쪽 아래 보고 서기)
    3.  `IDLE_LEFT` (왼쪽 보고 서기)
    4.  `IDLE_UP_LEFT` (왼쪽 위 보고 서기)
    5.  `IDLE_UP` (뒷모습으로 서기)
    6.  `WALK_DOWN` (정면 보고 걷기)
    7.  `WALK_DOWN_LEFT` (왼쪽 아래 보고 걷기)
    8.  `WALK_LEFT` (왼쪽 보고 걷기)
    9.  `WALK_UP_LEFT` (왼쪽 위 보고 걷기)
    10. `WALK_UP` (뒷모습으로 걷기)

*   **`4axis` 타입의 경우 (총 6줄)**
    1.  `IDLE_DOWN` (정면 보고 서기)
    2.  `IDLE_LEFT` (왼쪽 보고 서기)
    3.  `IDLE_UP` (뒷모습으로 서기)
    4.  `WALK_DOWN` (정면 보고 걷기)
    5.  `WALK_LEFT` (왼쪽 보고 걷기)
    6.  `WALK_UP` (뒷모습으로 걷기)


### 3. `pack.json` 파일 작성하기

`pack.json`은 새로 추가할 캐릭터의 정보를 담고 있는 설정 파일입니다.

1.  `MyCharacter` 폴더 안에서 마우스 오른쪽 버튼을 클릭하여 **새로 만들기 > 텍스트 문서**를 선택합니다.
2.  파일 이름을 `pack.json`으로 변경합니다. (확장자가 `.txt`에서 `.json`으로 바뀌어야 합니다.)
3.  `pack.json` 파일을 메모장이나 다른 텍스트 편집기로 열어, 아래 내용을 기반으로 작성합니다.

#### `pack.json` 기본 구조

```json
{
    "meta": {
        "name": "MyFirstCharacter",
        "author": "사용자 이름",
        "description": "내가 직접 만든 첫 번째 캐릭터입니다.",
        "version": "1.0.0"
    },
    "assets": {
        "character": {
            "name": "나의 첫 캐릭터"
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

#### 중요: `meta.name`
`meta.name`은 팩을 식별하는 **고유한 ID**입니다. 다른 팩과 겹치지 않는 영문 이름으로 작성해야 합니다. (예: `MyCoolDragon`, `CheeseCat_v2`)
`assets.character.name`은 프로그램 내에서 실제로 표시될 캐릭터의 이름입니다. 이 값은 다른 팩과 겹쳐도 괜찮습니다.

#### 캐릭터 애니메이션 타입 (`type`) 상세 설명

`assets.sprite.type` 값에 따라 캐릭터의 동작 방식과 `anims`에 필요한 내용이 달라집니다. 총 4가지 타입이 있습니다.

##### 1. `STATIC`
*   **설명**: 아무런 움직임 없는 단순 이미지를 띄웁니다.
*   **`anims`**: 이 타입에서는 `anims` 속성이 필요 없습니다.
*   **`pack.json` 예시**:
    ```json
    "sprite": {
        "src": "sprite.png",
        "columns": 1,
        "rows": 1,
        "type": "STATIC"
    }
    ```

##### 2. `IDLE_ONLY`
*   **설명**: 캐릭터가 제자리에서 가만히 있는 동작(숨쉬기 등)만 반복합니다. 슬라임이나, 부유하고 있는 캐릭터에게 적당합니다.
*   **`anims`**: `IDLE` 동작 하나만 정의합니다.
*   **`pack.json` 예시**:
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
*   **설명**: 캐릭터가 상, 하, 좌, 우 4방향으로 걷거나 제자리에서 대기합니다.
*   **`anims`**: `IDLE`과 `WALK` 동작을 `DOWN`, `LEFT`, `UP` 방향에 대해 정의합니다. 오른쪽(RIGHT)은 왼쪽(LEFT)을 좌우 반전하여 자동으로 처리됩니다.
*   **`pack.json` 예시**:
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
*   **설명**: 캐릭터가 상, 하, 좌, 우 및 대각선을 포함한 8방향으로 걷거나 제자리에서 대기합니다. 가장 자연스러운 움직임을 보여줍니다.
*   **`anims`**: `IDLE`과 `WALK` 동작을 `DOWN`, `DOWN_LEFT`, `LEFT`, `UP_LEFT`, `UP` 방향에 대해 정의합니다. 오른쪽 방향들은 왼쪽 방향들을 좌우 반전하여 자동으로 처리됩니다.
*   **`pack.json` 예시**:
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

### 4. 팩 적용하기

1.  Idleama 프로그램의 **팩 관리 버튼**을 클릭합니다.
2.  방금 추가한 팩이 목록에 나타나는지 확인하고 선택합니다.
3.  적용이 완료되면 새로운 캐릭터 팩을 선택할 수 있습니다!