# Idleamaの使い方

Idleamaをご利用いただきありがとうございます！このドキュメントでは、Idleamaの基本的な使い方とキャラクターパックの追加方法について説明します。

## 自分だけのキャラクターパックを追加する

Idleamaの最大の特徴は、ユーザーが自作したキャラクターをデスクトップに追加できることです。以下のガイドに従って、あなただけのキャラクターを追加してみましょう。

### 1. パックフォルダの準備

まず、追加したいキャラクターのパックフォルダを作成する必要があります。

1.  **`マイドキュメント`** フォルダに移動します。
2.  `Idleama`フォルダを探して開きます。（フォルダが存在しない場合は、プログラムを一度実行してから再度確認してください。）
3.  `characterpacks`フォルダの中に**新しいフォルダ**を作成します。このフォルダ名がパックのIDになります（例：`MyCharacter`）。

    ```
    マイドキュメント
    └── Idleama
        └── characterpacks
            └── MyCharacter  <-- 新しく作成したフォルダ
    ```

### 2. スプライト画像の準備

**スプライト**とは、キャラクターの動きを一枚の画像に順番に描画したものです。

*   キャラクターの様々な動作（待機、歩行など）を決められたセルに合わせて配置した画像ファイル（`sprite.png`）を準備する必要があります。
*   準備した`sprite.png`ファイルを、先ほど作成した`MyCharacter`フォルダの中に入れます。

#### 重要：スプライトシートの順序

スプライトシートの各行（Row）は、決められたアニメーションの順序に従って描画する必要があります。この順序を守らないと、アニメーションが不自然に見えることがあります。

*   **`8axis`タイプの場合（全10行）**
    1.  `IDLE_DOWN`（正面向き待機）
    2.  `IDLE_DOWN_LEFT`（左下向き待機）
    3.  `IDLE_LEFT`（左向き待機）
    4.  `IDLE_UP_LEFT`（左上向き待機）
    5.  `IDLE_UP`（後ろ向き待機）
    6.  `WALK_DOWN`（正面向き歩行）
    7.  `WALK_DOWN_LEFT`（左下向き歩行）
    8.  `WALK_LEFT`（左向き歩行）
    9.  `WALK_UP_LEFT`（左上向き歩行）
    10. `WALK_UP`（後ろ向き歩行）

*   **`4axis`タイプの場合（全6行）**
    1.  `IDLE_DOWN`（正面向き待機）
    2.  `IDLE_LEFT`（左向き待機）
    3.  `IDLE_UP`（後ろ向き待機）
    4.  `WALK_DOWN`（正面向き歩行）
    5.  `WALK_LEFT`（左向き歩行）
    6.  `WALK_UP`（後ろ向き歩行）


### 3. `pack.json`ファイルの作成

`pack.json`は、新しく追加するキャラクターの情報を記述する設定ファイルです。

1.  `MyCharacter`フォルダ内で右クリックし、**新規作成 > テキスト ドキュメント**を選択します。
2.  ファイル名を`pack.json`に変更します。（拡張子を`.txt`から`.json`に変更する必要があります。）
3.  `pack.json`ファイルをメモ帳などのテキストエディタで開き、以下の内容をベースに作成します。

#### `pack.json`の基本構造

```json
{
    "meta": {
        "name": "MyFirstCharacter",
        "author": "あなたの名前",
        "description": "私が初めて作ったキャラクターです。",
        "version": "1.0.0"
    },
    "assets": {
        "character": {
            "name": "私の最初のキャラクター"
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

#### 重要：`meta.name`
`meta.name`はパックを識別するための**ユニークなID**です。他のパックと重複しない英字の名前で作成する必要があります（例：`MyCoolDragon`、`CheeseCat_v2`）。
`assets.character.name`はプログラム内で実際に表示されるキャラクターの名前です。この値は他のパックと重複しても問題ありません。

#### キャラクターアニメーションタイプ（`type`）の詳細

`assets.sprite.type`の値によって、キャラクターの動作方法と`anims`に必要な内容が変わります。合計4つのタイプがあります。

##### 1. `STATIC`
*   **説明**: 動きのない単一の画像を表示します。
*   **`anims`**: このタイプでは`anims`プロパティは不要です。
*   **`pack.json`の例**:
    ```json
    "sprite": {
        "src": "sprite.png",
        "columns": 1,
        "rows": 1,
        "type": "STATIC"
    }
    ```

##### 2. `IDLE_ONLY`
*   **説明**: キャラクターがその場で待機する動作（呼吸など）のみを繰り返します。スライムや浮遊しているキャラクターに適しています。
*   **`anims`**: `IDLE`動作のみを定義します。
*   **`pack.json`の例**:
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
*   **説明**: キャラクターが上下左右の4方向に歩いたり、その場で待機したりします。
*   **`anims`**: `IDLE`と`WALK`の動作を`DOWN`、`LEFT`、`UP`の方向に対して定義します。右方向（RIGHT）は左方向（LEFT）を左右反転して自動的に処理されます。
*   **`pack.json`の例**:
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
*   **説明**: キャラクターが上下左右および斜めを含む8方向に歩いたり、その場で待機したりします。最も自然な動きを見せます。
*   **`anims`**: `IDLE`と`WALK`の動作を`DOWN`、`DOWN_LEFT`、`LEFT`、`UP_LEFT`、`UP`の方向に対して定義します。右側の方向は左側の方向を左右反전して自動的に処理されます。
*   **`pack.json`の例**:
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

### 4. パックの適用

1.  Idleamaプログラムの**パック管理ボタン**をクリックします。
2.  追加したパックがリストに表示されていることを確認し、選択します。
3.  適用が完了すると、新しいキャラクターパックを選択できるようになります！
