// AES 암호화를 위한 키 (사용자 고유로 만들면 더 좋음)
const ENCRYPTION_KEY = "i_love_sweetpotato";

function encrypt(text) {
  return CryptoJS.AES.encrypt(text, ENCRYPTION_KEY).toString();
}

function decrypt(cipher) {
  const bytes = CryptoJS.AES.decrypt(cipher, ENCRYPTION_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}

function saveNote() {
  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("content").value;
  const password = document.getElementById("password").value;

  if (!title || !content || !password) {
    alert("모든 필드를 입력하세요.");
    return;
  }

  const encryptedPassword = encrypt(password);
  const encryptedContent = encrypt(content);

  const noteData = {
    content: encryptedContent,
    password: encryptedPassword,
  };

  localStorage.setItem("note_" + title, JSON.stringify(noteData));
  alert("노트 저장 완료!");
  document.getElementById("note-form").reset();
}

function loadNote() {
  const title = document.getElementById("view-title").value.trim();
  const inputPassword = document.getElementById("view-password").value;

  const noteRaw = localStorage.getItem("note_" + title);

  if (!noteRaw) {
    alert("해당 노트가 존재하지 않습니다.");
    return;
  }

  const noteData = JSON.parse(noteRaw);
  const storedPassword = decrypt(noteData.password);

  if (inputPassword !== storedPassword) {
    alert("비밀번호가 틀렸습니다.");
    return;
  }

  const decryptedContent = decrypt(noteData.content);
  document.getElementById("note-display").innerText = decryptedContent;
}
     