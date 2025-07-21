import axios from "axios";
import { useEffect, useRef, useState } from "react";

const CountdownTimer = ({ onTick, onNewMinute, shouldStop = false, isFinished = false }) => {
  const infophien = JSON.parse(localStorage.getItem("xemctpdg"));
  const [timeLeft, setTimeLeft] = useState(null);
  const [started, setStarted] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const intervalRef = useRef(null);

  const startCountdown = (initialSeconds) => {
    setTimeLeft(initialSeconds);
    setStarted(true);
    setIsWaiting(false);

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);

          setTimeout(() => {
            if (typeof onTick === "function") onTick();
          }, 1000); // ✅ Gọi handleOnTick sau 1s

          // ⏳ Bắt đầu trạng thái chờ 15s
          setIsWaiting(true);

          setTimeout(() => {
            if (!shouldStop) {
              // ✅ Gọi reset handledRef ngay trước khi bắt đầu vòng mới
              if (typeof onNewMinute === "function") onNewMinute();
              startCountdown(60);
            }
          }, 15000);

          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    const fetchStartTime = async () => {
      try {
        const res = await axios.get(`http://localhost:3005/api/timeset/thoigianbd?idphiendg=${infophien.idphiendg}`);
        const startTimeServer = new Date(res.data.startTime).getTime();
        const now = Date.now();
        const elapsed = Math.floor((now - startTimeServer) / 1000);
        const remaining = Math.max(60 - (elapsed % 60), 0);

        if (elapsed < 0) {
          setTimeLeft(60);
          return;
        }

        startCountdown(remaining);
      } catch (err) {
        console.error("❌ Lỗi khi fetch thời gian bắt đầu:", err);
      }
    };

    if (!shouldStop) fetchStartTime();

    return () => clearInterval(intervalRef.current);
  }, [shouldStop]);

  useEffect(() => {
    if (shouldStop && intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, [shouldStop]);

  const minutes = String(Math.floor((timeLeft ?? 60) / 60)).padStart(2, "0");
  const seconds = String((timeLeft ?? 60) % 60).padStart(2, "0");

  return (
    <div className="flex items-center gap-6 mb-4">
      <span className="font-semibold text-gray-500">
        {isFinished
          ? "✅ Phiên đấu giá đã kết thúc"
          : started
          ? isWaiting
            ? "⏳ Đang xử lý, vui lòng chờ 15 giây..."
            : "Thời gian cập nhật phiên:"
          : "Đang chờ bắt đầu..."}
      </span>
      <div className="flex gap-2 text-center">
        <div className="bg-gray-100 rounded-lg px-4 py-2">
          <div className="text-xl font-bold">{isFinished || isWaiting ? "00" : minutes}</div>
          <div className="text-xs text-gray-500">PHÚT</div>
        </div>
        <div className="bg-gray-100 rounded-lg px-4 py-2">
          <div className="text-xl font-bold">{isFinished ? "00" : isWaiting ? "15" : seconds}</div>
          <div className="text-xs text-gray-500">GIÂY</div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
