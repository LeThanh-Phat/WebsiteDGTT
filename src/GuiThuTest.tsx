function GuiThuTest({ email }) {
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    setSending(true);
    try {
      const res = await fetch("http://localhost:3005/api/mail/test-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to: email })
      });

      const data = await res.json();
      alert(data.message);
    } catch (err) {
      console.error(err);
      alert("Lỗi gửi email!");
    }
    setSending(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Gửi Gmail Cảnh Báo đến {email}</h2>
      <button onClick={handleSend} disabled={sending}>
        {sending ? "Đang gửi..." : "Gửi Gmail Cảnh Báo"}
      </button>
    </div>
  );
}

// Cách sử dụng:
<GuiThuTest email="user@gmail.com" />
