let currentUser = null;
let userData = { lv: 1, coins: 500, tickets: 0, inventory: [], pets: [], isAdmin: false };
let weatherList = ["Sunny", "Rainy", "Snowy", "Siberia", "Spotlight", "Thunderstorm", "Desert"];
let currentWeather = "Sunny";
let isSellMode = false;

window.save = () => {
    if (currentUser) {
        let all = JSON.parse(localStorage.getItem('zooUsers') || '{}');
        all[currentUser].d = userData;
        localStorage.setItem('zooUsers', JSON.stringify(all));
    }
};

window.toggleFavorite = (idx, event) => {
    event.stopPropagation();
    if (userData.inventory[idx]) {
        userData.inventory[idx].isFavorite = !userData.inventory[idx].isFavorite;
        updateUI();
    }
};

window.handleAuth = (mode) => {
    const u = document.getElementById('username').value.trim();
    const p = document.getElementById('password').value.trim();
    if (!u || !p) return alert("Vui lòng nhập đủ!");
    let users = JSON.parse(localStorage.getItem('zooUsers') || '{}');
    if (mode === 'register') {
        if (users[u]) return alert("Tên đã tồn tại!");
        users[u] = { p: p, d: { name: u, lv: 1, coins: 500, tickets: 0, inventory: [], pets: [], isAdmin: (u.toLowerCase()==='admin') } };
        localStorage.setItem('zooUsers', JSON.stringify(users));
        alert("Đã tạo sở thú!");
    } else {
        if (!users[u] || users[u].p !== p) return alert("Sai tài khoản!");
        currentUser = u; userData = users[u].d;
        if(!userData.tickets) userData.tickets = 0;
        if(!userData.inventory) userData.inventory = [];
        if(!userData.pets) userData.pets = [];
        document.getElementById('auth-box').style.display = 'none';
        document.getElementById('game-card').classList.remove('hidden');
        document.getElementById('zoo-name').innerText = userData.name;
        updateUI(); startSystems();
    }
};

function startSystems() {
    setInterval(() => {
        if (!currentUser) return;
        let inc = userData.pets.reduce((s, p) => {
            let m = p.mutation ? (mutations[p.mutation.type]?.multiplier || 1) : 1;
            return s + (Number(p.income || 0) * m);
        }, 0);
        userData.coins = (Number(userData.coins) || 0) + inc;
        document.getElementById('zoo-coins').innerText = Math.floor(userData.coins).toLocaleString();
        window.save();
    }, 1000);
    
    setInterval(() => {
        if (!currentUser) return;
        let r = Math.random() * 100;
        if (r <= 25) currentWeather = "Spotlight";
        else if (r <= 45) currentWeather = "Desert";
        else {
            const others = ["Sunny", "Rainy", "Snowy", "Siberia", "Thunderstorm"];
            currentWeather = others[Math.floor(Math.random() * others.length)];
        }
        
        if(currentWeather === "Spotlight") userData.tickets = (userData.tickets || 0) + 10;

        const icons = { "Sunny":"☀️","Rainy":"🌧️","Snowy":"❄️","Siberia":"🧊","Spotlight":"🔦","Thunderstorm":"⛈️","Desert":"🏜️" };
        const iconElem = document.getElementById('weather-icon');
        if(iconElem) iconElem.innerText = icons[currentWeather];
        let effectLayer = document.getElementById('weather-effect');
        if(effectLayer) effectLayer.className = "weather-layer " + currentWeather.toLowerCase();
        updateUI();
    }, 30000);
}

window.buyEgg = (type, price) => {
    const egg = eggData[type];
    const isTicket = egg.currency === "tickets";
    if (isTicket) {
        if ((userData.tickets || 0) < price) return alert("Cần thêm Ticket!");
        userData.tickets -= price;
    } else {
        if (userData.coins < price) return alert("Thiếu tiền!");
        userData.coins -= price;
    }

    let r = Math.random() * 100;
    let ra = (r <= 0.5) ? 'Prismatic' : (r <= 1.5) ? 'Divine' : (r <= 11) ? 'Mythical' : (r <= 30) ? 'Legendary' : (r <= 60) ? 'Rare' : 'Common';

    const rarityOrder = ['Prismatic', 'Divine', 'Mythical', 'Legendary', 'Rare', 'Common'];
    let pData = null;
    let startIndex = rarityOrder.indexOf(ra);
    for (let i = startIndex; i < rarityOrder.length; i++) {
        pData = egg.pets.find(p => p.rarity === rarityOrder[i]);
        if (pData) break;
    }
    if (!pData) pData = egg.pets[egg.pets.length - 1];

    let newPet = JSON.parse(JSON.stringify(pData));
    let hasNarrator = userData.pets.some(p => p.passive === "spotlight_booster");
    let hasChimera = userData.pets.some(p => p.passive === "poison_master");
    let hasAnubis = userData.pets.some(p => p.passive === "desert_blessing");
    
    if (hasAnubis && Math.random() < 0.4) newPet.mutation = { type: "Desert", ...mutations["Desert"] };
    else if (hasChimera && Math.random() < 0.5) newPet.mutation = { type: "Poison", ...mutations["Poison"] };
    else if (hasNarrator && Math.random() < 0.9) newPet.mutation = { type: "Spotlight", ...mutations["Spotlight"] };
    else if (currentWeather === "Desert" && Math.random() < 0.2) newPet.mutation = { type: "Desert", ...mutations["Desert"] };
    else if (currentWeather === "Spotlight" && Math.random() < 0.0127) newPet.mutation = { type: "Spotlight", ...mutations["Spotlight"] };
    else if (currentWeather === "Thunderstorm" && Math.random() < 0.14) newPet.mutation = { type: "Thunderstorm", ...mutations["Thunderstorm"] };
    else if (Math.random() < 0.15 && mutations[currentWeather]) newPet.mutation = { type: currentWeather, ...mutations[currentWeather] };

    userData.inventory.push(newPet);
    updateUI();
};

function updateUI() {
    if (!currentUser) return;
    document.getElementById('zoo-lv').innerText = userData.lv;
    document.getElementById('zoo-coins').innerText = Math.floor(userData.coins).toLocaleString();
    let ticketDisplay = document.getElementById('zoo-tickets');
    if(ticketDisplay) ticketDisplay.innerText = (userData.tickets || 0).toLocaleString();

    let max = userData.lv === 1 ? 3 : (userData.lv === 2 ? 5 : 12);
    document.getElementById('slot-count').innerText = `${userData.pets.length}/${max}`;
    
    const disp = document.getElementById('zoo-display');
    if(disp) {
        disp.innerHTML = "";
        for (let i = 0; i < max; i++) {
            let p = userData.pets[i];
            let div = document.createElement('div');
            div.className = `pet-slot ${p?.mutation ? p.mutation.vfx : ''} ${p?.rarity === 'Prismatic' ? 'prismatic-border' : ''}`;
            if (p) {
                let s = p.icon.length > 2 ? "font-size: 24px;" : "font-size: 35px;";
                div.innerHTML = `<div class="pet-icon-wrapper" style="${s}">${p.icon}</div>${p.mutation ? `<div class="mutation-tag">${p.mutation.label}</div>` : ''}`;
                div.onclick = () => window.unequipPet(i);
            }
            disp.appendChild(div);
        }
    }

    const invList = document.getElementById('inv-list');
    if(invList) {
        invList.innerHTML = "";
        userData.inventory.forEach((it, idx) => {
            let s = it.icon.length > 2 ? "font-size: 24px;" : "font-size: 35px;";
            let div = document.createElement('div');
            div.className = `slot ${it.mutation ? it.mutation.vfx : ''} ${it.rarity === 'Prismatic' ? 'prismatic-border' : ''} ${it.isFavorite ? 'favorited' : ''} ${isSellMode ? 'sell-mode' : ''}`;
            div.onclick = () => window.handleInvClick(idx);
            div.innerHTML = `<div class="fav-star" onclick="window.toggleFavorite(${idx}, event)">${it.isFavorite ? '⭐' : '☆'}</div><div class="pet-icon-wrapper" style="${s}">${it.icon}</div>${it.mutation ? `<div class="mutation-tag">${it.mutation.label}</div>` : ''}`;
            invList.appendChild(div);
        });
    }

    const upBtn = document.getElementById('upgrade-btn');
    const costs = { 1: 5000, 2: 50000, 3: 500000, 4: 2000000 };
    if (userData.pets.length >= max && costs[userData.lv]) {
        if(upBtn) {
            upBtn.classList.remove('hidden');
            upBtn.innerText = `🔼 NÂNG CẤP (${costs[userData.lv].toLocaleString()}💰)`;
        }
    } else if(upBtn) upBtn.classList.add('hidden');
    window.save();
}

window.handleInvClick = (idx) => isSellMode ? window.sellPet(idx) : window.equipPet(idx);
window.sellPet = (idx) => { 
    if(userData.inventory[idx].isFavorite) return alert("❌ Hãy bỏ sao ⭐ trước khi bán.");
    userData.coins += (userData.inventory[idx].sellValue || 0); 
    userData.inventory.splice(idx, 1); 
    updateUI(); 
};
window.equipPet = (idx) => {
    let max = userData.lv === 1 ? 3 : (userData.lv === 2 ? 5 : 12);
    if (userData.pets.length < max) { 
        userData.pets.push(userData.inventory[idx]); 
        userData.inventory.splice(idx, 1); 
        updateUI(); 
    } else alert("Đầy chỗ!");
};
window.unequipPet = (idx) => { 
    userData.inventory.push(userData.pets[idx]); 
    userData.pets.splice(idx, 1); 
    updateUI(); 
};
window.toggleSellMode = () => { 
    isSellMode = !isSellMode; 
    let btn = document.getElementById('sell-btn'); 
    if(btn) btn.className = isSellMode ? "btn-3d red" : "btn-3d orange"; 
    updateUI(); 
};
window.sellAll = () => {
    let normalPets = userData.inventory.filter(p => !p.isFavorite);
    if (!normalPets.length) return alert("Không có thú cưng hợp lệ để bán!");
    let total = normalPets.reduce((s, p) => s + (Number(p.sellValue) || 0), 0);
    if (confirm(`Bán ${normalPets.length} thú cưng lấy ${total.toLocaleString()} xu?`)) { 
        userData.coins += total; 
        userData.inventory = userData.inventory.filter(p => p.isFavorite);
        updateUI(); 
    }
};
window.upgradeZoo = () => {
    const costs = { 1: 5000, 2: 50000, 3: 500000, 4: 2000000 };
    if (userData.coins >= costs[userData.lv]) { 
        userData.coins -= costs[userData.lv]; 
        userData.lv++; 
        updateUI(); 
    } else alert("Chưa đủ tiền!");
};
window.logout = () => { if(confirm("Bạn muốn thoát?")) { window.save(); location.reload(); } };
window.toggle = (id) => { 
    let e = document.getElementById(id); 
    if(e) e.style.display = (e.style.display==='block')?'none':'block'; 
};
window.useSacrificialTable = () => {
    let divines = userData.inventory.filter(p => p.rarity === "Divine" && !p.isFavorite);
    if (divines.length < 4) return alert("Cần 4 thú cưng Divine!");
    if (confirm("Hiến tế 4 Divine để triệu hồi Chimera?")) {
        let count = 0;
        userData.inventory = userData.inventory.filter(p => {
            if (count < 4 && p.rarity === "Divine" && !p.isFavorite) { count++; return false; }
            return true;
        });
        userData.inventory.push(JSON.parse(JSON.stringify(chimeraData)));
        updateUI();
    }
};window.spinWheel = () => {
    if (userData.tickets < 10) return alert("Ngài cần 10 🎟️ để quay!");
    
    const spinBtn = document.getElementById('spin-btn');
    const wheel = document.getElementById('wheel-container');
    
    userData.tickets -= 10;
    updateUI();
    
    spinBtn.disabled = true;
    wheel.classList.add('spinning');
    wheel.innerText = "🌀";

    setTimeout(() => {
        wheel.classList.remove('spinning');
        spinBtn.disabled = false;
        
        const rand = Math.random() * 100;
        let reward = "";
        
        if (rand < 50) { // 50% trúng tiền
            const coins = 500000;
            userData.coins += coins;
            reward = `💰 +${coins.toLocaleString()} Xu`;
        } else if (rand < 80) { // 30% trúng thêm vé
            userData.tickets += 2;
            reward = `🎟️ +2 Vé May Mắn`;
        } else { // 20% trúng Trứng Carnival cực hiếm
            const egg = eggData.carnival;
            const pet = egg.pets[Math.floor(Math.random() * egg.pets.length)];
            userData.inventory.push({ ...pet, id: Date.now() });
            reward = `🎡 TRÚNG TRỨNG CARNIVAL: ${pet.icon} ${pet.name}!`;
        }
        
        wheel.innerText = "🎁";
        alert(`[Medal Lucky Wheel]\n${reward}`);
        updateUI();
    }, 2000);
};