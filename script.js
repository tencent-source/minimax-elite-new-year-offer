// MiniMax Elite - FOMO Popups and Countdown Script

// FOMO Popup Data - Mix of real faces and anime
const fomoData = [
    {
        name: "Wei Zhang",
        location: "Beijing",
        action: "just claimed 10% OFF",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
        isAnime: false
    },
    {
        name: "美咲 (Misaki)",
        location: "Tokyo",
        action: "just signed up",
        avatar: "https://i.imgur.com/JYgJHVS.png",
        isAnime: true
    },
    {
        name: "Liu Chen",
        location: "Shanghai",
        action: "saved $2,400 this year",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
        isAnime: false
    },
    {
        name: "桜子 (Sakurako)",
        location: "Osaka",
        action: "just upgraded to Elite",
        avatar: "https://i.imgur.com/qGELvHT.png",
        isAnime: true
    },
    {
        name: "Mei Ling",
        location: "Hong Kong",
        action: "claimed $500 free credits",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
        isAnime: false
    },
    {
        name: "雪 (Yuki)",
        location: "Kyoto",
        action: "just joined MiniMax Elite",
        avatar: "https://i.imgur.com/8KQpLHt.png",
        isAnime: true
    },
    {
        name: "David Park",
        location: "Seoul",
        action: "switched from GPT-4",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
        isAnime: false
    },
    {
        name: "玲奈 (Reina)",
        location: "Nagoya",
        action: "got 10% discount",
        avatar: "https://i.imgur.com/mZjKLrT.png",
        isAnime: true
    },
    {
        name: "Xiao Ming",
        location: "Shenzhen",
        action: "just redeemed vouchers",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&h=80&fit=crop&crop=face",
        isAnime: false
    },
    {
        name: "愛 (Ai)",
        location: "Fukuoka",
        action: "claimed exclusive offer",
        avatar: "https://i.imgur.com/vQwPL9k.png",
        isAnime: true
    },
    {
        name: "Jenny Wong",
        location: "Singapore",
        action: "saved $1,200 today",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face",
        isAnime: false
    },
    {
        name: "心 (Kokoro)",
        location: "Yokohama",
        action: "just activated API",
        avatar: "https://i.imgur.com/TQ5rHYv.png",
        isAnime: true
    },
    {
        name: "Michael Lee",
        location: "Taipei",
        action: "upgraded subscription",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face",
        isAnime: false
    },
    {
        name: "ひなた (Hinata)",
        location: "Sendai",
        action: "just joined today",
        avatar: "https://i.imgur.com/9EqN5Lv.png",
        isAnime: true
    },
    {
        name: "Anna Chen",
        location: "Guangzhou",
        action: "claimed referral bonus",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=face",
        isAnime: false
    }
];

// Time values for FOMO popups
const timeAgo = [
    "just now",
    "2 seconds ago",
    "5 seconds ago",
    "12 seconds ago",
    "30 seconds ago",
    "1 minute ago",
    "2 minutes ago"
];

// Countdown Timer
class CountdownTimer {
    constructor() {
        // Set countdown to 2 hours 59 minutes 47 seconds from now
        this.endTime = new Date().getTime() + (2 * 60 * 60 * 1000) + (59 * 60 * 1000) + (47 * 1000);
        this.init();
    }

    init() {
        this.update();
        setInterval(() => this.update(), 1000);
    }

    update() {
        const now = new Date().getTime();
        const distance = this.endTime - now;

        if (distance < 0) {
            // Reset timer if expired
            this.endTime = new Date().getTime() + (2 * 60 * 60 * 1000) + (59 * 60 * 1000) + (47 * 1000);
            return;
        }

        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Format with leading zeros
        const h = String(hours).padStart(2, '0');
        const m = String(minutes).padStart(2, '0');
        const s = String(seconds).padStart(2, '0');

        // Update all countdown displays
        this.updateElement('hours', h);
        this.updateElement('minutes', m);
        this.updateElement('seconds', s);
        this.updateElement('hours-final', h);
        this.updateElement('minutes-final', m);
        this.updateElement('seconds-final', s);

        // Update banner countdown
        const bannerCountdown = document.getElementById('banner-countdown');
        if (bannerCountdown) {
            bannerCountdown.textContent = `${h}:${m}:${s}`;
        }
    }

    updateElement(id, value) {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    }
}

// FOMO Popup Manager
class FOMOPopupManager {
    constructor() {
        this.container = document.getElementById('fomo-container');
        this.activePopups = [];
        this.maxPopups = 3;
        this.usedIndices = [];
        this.init();
    }

    init() {
        // Show first popup after 3 seconds
        setTimeout(() => this.showPopup(), 3000);

        // Show subsequent popups every 5-8 seconds
        setInterval(() => {
            if (this.activePopups.length < this.maxPopups) {
                this.showPopup();
            }
        }, 5000 + Math.random() * 3000);
    }

    getRandomFOMO() {
        // Get a random index that hasn't been used recently
        let index;
        do {
            index = Math.floor(Math.random() * fomoData.length);
        } while (this.usedIndices.includes(index) && this.usedIndices.length < fomoData.length);

        this.usedIndices.push(index);
        if (this.usedIndices.length > 5) {
            this.usedIndices.shift();
        }

        return fomoData[index];
    }

    showPopup() {
        const data = this.getRandomFOMO();
        const time = timeAgo[Math.floor(Math.random() * timeAgo.length)];

        const popup = document.createElement('div');
        popup.className = 'fomo-popup';
        popup.innerHTML = `
            <img src="${data.avatar}" alt="${data.name}" class="fomo-avatar ${data.isAnime ? 'anime' : ''}">
            <div class="fomo-content">
                <div class="fomo-name">${data.name}</div>
                <div class="fomo-action">${data.action}</div>
                <div class="fomo-time">📍 ${data.location} • ${time}</div>
            </div>
        `;

        this.container.appendChild(popup);
        this.activePopups.push(popup);

        // Remove popup after 4-6 seconds
        setTimeout(() => {
            popup.style.animation = 'slide-out 0.5s ease-out forwards';
            setTimeout(() => {
                if (popup.parentNode) {
                    popup.parentNode.removeChild(popup);
                }
                this.activePopups = this.activePopups.filter(p => p !== popup);
            }, 500);
        }, 4000 + Math.random() * 2000);
    }
}

// Spots Remaining Counter
class SpotsCounter {
    constructor() {
        this.spots = 23;
        this.minSpots = 7;
        this.init();
    }

    init() {
        // Randomly decrease spots every 30-60 seconds
        setInterval(() => {
            if (this.spots > this.minSpots && Math.random() > 0.5) {
                this.spots--;
                this.updateDisplay();
            }
        }, 30000 + Math.random() * 30000);
    }

    updateDisplay() {
        const elements = ['spots-left', 'spots-remaining'];
        elements.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.textContent = this.spots;
                el.style.animation = 'none';
                el.offsetHeight; // Trigger reflow
                el.style.animation = 'spot-flash 0.5s ease-out';
            }
        });

        // Update scarcity bar
        const scarcityFill = document.querySelector('.scarcity-fill');
        if (scarcityFill) {
            scarcityFill.style.width = `${(this.spots / 23) * 100}%`;
        }
    }
}

// Add slide-out animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slide-out {
        from {
            transform: translateX(0) scale(1);
            opacity: 1;
        }
        to {
            transform: translateX(-100%) scale(0.8);
            opacity: 0;
        }
    }

    @keyframes spot-flash {
        0%, 100% { color: inherit; }
        50% { color: #ef4444; transform: scale(1.2); }
    }
`;
document.head.appendChild(style);

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// CTA button click tracking
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', function () {
        // Add click animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);

        // Track conversion (placeholder for analytics)
        console.log('CTA clicked:', this.id || 'main-cta');
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animate elements on scroll
document.querySelectorAll('.pain-card, .solution-card, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new CountdownTimer();
    new FOMOPopupManager();
    new SpotsCounter();

    console.log('MiniMax Elite Landing Page Initialized');
    console.log('Referral Link: https://platform.minimax.io/subscribe/coding-plan?code=6A7d87ipnt&source=link');
});

// Preload images for FOMO popups
const preloadImages = () => {
    fomoData.forEach(data => {
        const img = new Image();
        img.src = data.avatar;
    });
};
preloadImages();
