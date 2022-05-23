import "./styles.css";

const onClickAdd = () => {
  //テキストボックスの値を取得し、初期化する。
  const inputText = document.getElementById("add-text").value;
  document.getElementById("add-text").value = "";

  createIncompleteList(inputText);
};

//関数化１　未完了リストから指定の要素を削除
const deleteFromIncompleteList = (target) => {
  document.getElementById("incomplete-list").removeChild(target);
};

//関数化２　未完了リストに追加する関数
const createIncompleteList = (text) => {
  //div生成
  const div = document.createElement("div");
  div.className = "list-row"; //生成されたdivにlist-rowクラスを付与している

  //liタグ生成
  const li = document.createElement("li");
  li.innerText = text;

  //button（完了）タグの作成
  const completeButton = document.createElement("button");
  completeButton.innerText = "完了";
  //ここで完了ボタンにイベントを付与している
  completeButton.addEventListener("click", () => {
    //押された完了ボタンの親タグ(div)を未完了リストから削除(下にある関数を使用)
    deleteFromIncompleteList(completeButton.parentNode);

    //完了リストに追加する要素
    const addTarget = completeButton.parentNode;

    //TODO内容テキストを取得
    const text = addTarget.firstElementChild.innerText;

    //div以下を初期化
    addTarget.textContent = null;

    //liタグを生成
    const li = document.createElement("li");
    li.innerText = text;

    //buttonタグ生成
    const backButton = document.createElement("button");
    backButton.innerText = "戻す";
    backButton.addEventListener("click", () => {
      //押された戻すボタンの親タグ(div)を完了リストから削除
      const deleteTarget = backButton.parentNode;
      document.getElementById("complete-list").removeChild(deleteTarget);

      //テキスト取得
      const text = backButton.parentNode.firstElementChild.innerText;
      createIncompleteList(text);
    });

    //divタグの子要素に各要素を設定
    div.appendChild(li);
    div.appendChild(backButton);

    //完了リストに実際に追加
    document.getElementById("complete-list").appendChild(addTarget);
  });

  //button(削除)タグの作成
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";
  //↓ここで削除ボタンにイベントを付与している
  deleteButton.addEventListener("click", () => {
    //押された削除ボタンの親タグ（div）を未完了リストから削除 (下にある関数を使用)
    deleteFromIncompleteList(deleteButton.parentNode);
  });

  //divタグの子要素に各要素を設定
  div.appendChild(li);
  div.appendChild(completeButton);
  div.appendChild(deleteButton);

  //未完了リストに追加
  document.getElementById("incomplete-list").appendChild(div);
};

document.getElementById("add-button").addEventListener("click", () => {
  return onClickAdd();
});
