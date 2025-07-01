function notifyDueTodayTasks() {
  // 這樣取得本地日期字串 yyyy-mm-dd，不用 toISOString
  const todayObj = new Date();
  const todayStr = `${todayObj.getFullYear()}-${String(todayObj.getMonth()+1).padStart(2, "0")}-${String(todayObj.getDate()).padStart(2, "0")}`;

  const dueToday = tasks.filter(t => t.due === todayStr && !t.done);

  console.log("🕒 notifyDueTodayTasks running");
  console.log("今天字串：", todayStr);
  console.log("所有任務：", tasks);
  console.log("今天到期的任務：", dueToday);

  if (!dueToday.length) return;

  if ("Notification" in window && Notification.permission === "granted") {
    new Notification("📌 今日到期任務", {
      body: `你今天有 ${dueToday.length} 筆任務到期，記得完成喔！`
    });
  } else if ("Notification" in window) {
    alert(`📌 今日有 ${dueToday.length} 筆任務到期，請留意！`);
  }
}
