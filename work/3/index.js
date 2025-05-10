document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("orderForm");
    const errorMsg = document.getElementById("errorMsg");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const phone = document.getElementById("phone").value;

        // Проверяем  не отправлял ли пользователь заявку ранее
        if (localStorage.getItem(`order_${phone}`)) {
            errorMsg.classList.remove("hidden");
            return;
        }

        const data = {
            stream_code: "vv4uf",
            client: { name, phone }
        };

        try {
            const response = await fetch("https://order.drcash.sh/v1/order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer RLPUUOQAMIKSAB2PSGUECA"
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                localStorage.setItem(`order_${phone}`, "true");
                window.location.href = "thankyou.html";
            } else {
                alert("Ошибка при отправке данных. Попробуйте снова.");
            }
        } catch (error) {
            console.error("Ошибка:", error);
            alert("Ошибка сети. Проверьте соединение.");
        }
    });
});
