const eggData = {
    grass: { 
        name: "Trứng Cỏ", price: 50, icon: "🌱", 
        pets: [
            { name: "Sâu", icon: "🐛", rarity: "Common", income: 2, sellValue: 10 },
            { name: "Bọ", icon: "🐞", rarity: "Rare", income: 5, sellValue: 25 },
            { name: "Nhện", icon: "🕷️", rarity: "Legendary", income: 15, sellValue: 100 },
            { name: "Ong", icon: "🐝", rarity: "Mythical", income: 40, sellValue: 500 },
            { name: "Bướm", icon: "🦋", rarity: "Divine", income: 150, sellValue: 2000 }
        ]
    },
    forest: { 
        name: "Trứng Rừng", price: 1000, icon: "🌳", 
        pets: [
            { name: "Khỉ", icon: "🐒", rarity: "Common", income: 50, sellValue: 200 },
            { name: "Hổ", icon: "🐯", rarity: "Rare", income: 150, sellValue: 500 },
            { name: "Voi", icon: "🐘", rarity: "Legendary", income: 450, sellValue: 2000 },
            { name: "Rồng", icon: "🐉", rarity: "Mythical", income: 1200, sellValue: 10000 },
            { name: "Kỳ Lân", icon: "🦄", rarity: "Divine", income: 5000, sellValue: 50000 }
        ]
    },
    siberia: { 
        name: "Trứng Siberia", price: 2000000000, icon: "❄️", 
        pets: [
            { name: "Cáo Tuyết", icon: "🦊", rarity: "Common", income: 500000, sellValue: 10000000 },
            { name: "Gấu Bắc Cực", icon: "🐻‍❄️", rarity: "Rare", income: 1500000, sellValue: 50000000 },
            { name: "Voi Ma Mút", icon: "🐘❄", rarity: "Legendary", income: 5000000, sellValue: 200000000 },
            { name: "Rồng Băng", icon: "🐉️❄", rarity: "Mythical", income: 20000000, sellValue: 1000000000 },
            { name: "Thần Băng Giá", icon: "🧊", rarity: "Divine", income: 100000000, sellValue: 5000000000 }
        ]
    },
    seadragon: { 
        name: "Trứng Rồng Biển", price: 100000000000, icon: "🌊", 
        pets: [
            { name: "Cá Ngựa", icon: "🐴🐟", rarity: "Common", income: 15000000, sellValue: 500000000 },
            { name: "Rùa Biển", icon: "🐢", rarity: "Rare", income: 45000000, sellValue: 1500000000 },
            { name: "Cá Mập", icon: "🦈", rarity: "Legendary", income: 85000000, sellValue: 4000000000 },
            { name: "Thủy Quái", icon: "🐙", rarity: "Mythical", income: 130000000, sellValue: 10000000000 },
            { name: "Long Vương", icon: "🐉🌊", rarity: "Divine", income: 200000000, sellValue: 50000000000 }
        ]
    },
    desert: {
        name: "Trứng Sa Mạc", price: 500000000000, icon: "🏜️",
        pets: [
            { name: "Bọ Hung", icon: "🪲", rarity: "Common", income: 50000000, sellValue: 2000000000 },
            { name: "Bọ Cạp", icon: "🦂", rarity: "Rare", income: 120000000, sellValue: 5000000000 },
            { name: "Lạc Đà", icon: "🐪", rarity: "Legendary", income: 300000000, sellValue: 15000000000 },
            { name: "Rắn Hổ Mang", icon: "🐍", rarity: "Mythical", income: 800000000, sellValue: 50000000000 },
            { name: "Nhân Sư", icon: "🦁🏺", rarity: "Divine", income: 2500000000, sellValue: 200000000000 },
            { name: "Anubis", icon: "🐺⚖️", rarity: "Prismatic", income: 10000000000, sellValue: 1000000000000, passive: "desert_blessing" }
        ]
    },
    magic: {
        name: "Trứng Ma Thuật", price: 5, currency: "tickets", icon: "🪄",
        pets: [
            { name: "Thỏ Mũ", icon: "🐰🎩", rarity: "Common", income: 150000, sellValue: 0 },
            { name: "Chim Bồ Câu", icon: "🕊️", rarity: "Rare", income: 400000, sellValue: 0 },
            { name: "Bộ Bài", icon: "🃏", rarity: "Legendary", income: 1200000, sellValue: 0 },
            { name: "Gậy Phép", icon: "✨", rarity: "Mythical", income: 5000000, sellValue: 0 },
            { name: "Nhà Ảo Thuật", icon: "🧙‍♂️", rarity: "Divine", income: 25000000, sellValue: 0 }
        ]
    },
    narrator: {
        name: "Trứng Người Kể Chuyện", price: 10, currency: "tickets", icon: "🎭",
        pets: [
            { name: "Sách Cổ", icon: "📖", rarity: "Common", income: 300000, sellValue: 0 },
            { name: "Đèn Cầy", icon: "🕯️", rarity: "Rare", income: 800000, sellValue: 0 },
            { name: "Quạ Đen", icon: "🐦‍⬛", rarity: "Legendary", income: 2500000, sellValue: 0 },
            { name: "Bóng Ma", icon: "👻", rarity: "Mythical", income: 10000000, sellValue: 0 },
            { name: "Lời Nguyền", icon: "📜", rarity: "Divine", income: 50000000, sellValue: 0 },
            { name: "Narrator", icon: "🎭", rarity: "Prismatic", income: 20000000, sellValue: 0, passive: "spotlight_booster" }
        ]
    },
carnival: {
        name: "Trứng Lễ Hội", price: 0, icon: "🎡",
        pets: [
            { name: "Hề Xiếc", icon: "🤡", rarity: "Legendary", income: 1000000, sellValue: 500000 },
            { name: "Ảo Thuật Gia", icon: "🎩", rarity: "Mythical", income: 5000000, sellValue: 2000000 },
            { name: "Sư Tử Lửa", icon: "🔥🦁", rarity: "Divine", income: 25000000, sellValue: 10000000 },
            { name: "Voi Đi Cầu", icon: "🐘⚽", rarity: "Divine", income: 30000000, sellValue: 12000000 },
            { name: "Carnival Master", icon: "🎡", rarity: "Prismatic", income: 100000000, sellValue: 0 }
        ]
    }
};

const mutations = {
    "Spotlight": { multiplier: 5, label: "🔦", vfx: "spotlight-effect" },
    "Sunny": { multiplier: 1.2, label: "☀️", vfx: "sunny-effect" },
    "Rainy": { multiplier: 1.5, label: "🌧️", vfx: "rainy-effect" },
    "Snowy": { multiplier: 2, label: "❄️", vfx: "snowy-effect" },
    "Siberia": { multiplier: 8, label: "🧊", vfx: "siberia-effect" },
    "Thunderstorm": { multiplier: 22, label: "⚡", vfx: "shocked-effect" },
    "Poison": { multiplier: 30, label: "🧪", vfx: "poison-effect" },
    "Desert": { multiplier: 18, label: "🏜️", vfx: "desert-effect" }
};

const chimeraData = { name: "Chimera", icon: "🦁🐍🐐", rarity: "Prismatic", income: 5000000, sellValue: 0, passive: "poison_master" };