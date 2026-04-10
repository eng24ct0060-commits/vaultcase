// VaultCase JavaScript Controller

const bidHistories = {
	'1': [],
	'2': [],
	'3': [],
	'4': []
};

const bidNames = {
	'1': 'Signed Football Jersey',
	'2': 'Ancient Coin',
	'3': 'Vintage Watch',
	'4': 'Rare Painting'
};

const timers = {};

// Filter Items
function filterItems() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        const title = card.getAttribute('data-title').toLowerCase();
        if (title.includes(input)) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.5s ease';
        } else {
            card.style.display = 'none';
        }
    });
}

// Bidding Logic
function placeBid(itemNum) {
	let bidElement = document.getElementById('bid' + itemNum);
	let value = parseInt(bidElement.innerText);
	
    // Simulate dynamic bidding increment based on current value
    let increment = value < 10000 ? 500 : (value < 30000 ? 1000 : 2500);
    value += increment;
    
    // Animate price change
    bidElement.style.color = '#fff';
    bidElement.parentElement.style.transform = 'scale(1.2)';
    setTimeout(() => {
        bidElement.style.color = '';
        bidElement.parentElement.style.transform = '';
    }, 200);

	bidElement.innerText = value;
	
	// Update bid count
	let bidsElement = document.getElementById('bids' + itemNum);
	let count = parseInt(bidsElement.innerText);
	count++;
	bidsElement.innerText = count;
	
	// Add to history
	bidHistories[itemNum].push({ 
        amount: value, 
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'}) 
    });

    // Show Toast Notification
    showToast('Bid Placed Successfully!', `You bid ₹${value} on ${bidNames[itemNum]}`);
}

// History Modal
function showHistory(num) {
	const modal = document.getElementById('historyModal');
	const list = document.getElementById('historyList');
	list.innerHTML = '';
    
	if (bidHistories[num].length === 0) {
		list.innerHTML = '<li style="justify-content:center; color: #a0a0b0;">No bids placed yet. Be the first!</li>';
	} else {
		bidHistories[num].slice().reverse().forEach(bid => {
			const li = document.createElement('li');
			li.innerHTML = `
                <span class="history-amount">₹${bid.amount.toLocaleString()}</span>
                <span class="history-time"><i class="fa-regular fa-clock"></i> ${bid.time}</span>
            `;
			list.appendChild(li);
		});
	}
	modal.style.display = 'block';
}

// Modals Setup
function closeHistory() { document.getElementById('historyModal').style.display = 'none'; }
function openLogin() { document.getElementById("loginModal").style.display = "block"; }
function closeLogin() { document.getElementById("loginModal").style.display = "none"; }
function openRegister() { document.getElementById("registerModal").style.display = "block"; }
function closeRegister() { document.getElementById("registerModal").style.display = "none"; }

window.onclick = function(event) {
	["loginModal", "registerModal", "historyModal"].forEach(id => {
		let modal = document.getElementById(id);
		if (event.target === modal) {
			modal.style.display = "none";
		}
	});
}

// Timer Logic
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function startTimer(timerId, winnerId, itemNum) {
	let timeElement = document.getElementById(timerId);
	let count = parseInt(timeElement.innerText);
    
    // Initial format
    timeElement.innerText = formatTime(count);

	timers[itemNum] = setInterval(() => {
		count--;
		timeElement.innerText = formatTime(count);
        
        // Visual warning when time is low
        if(count === 10) {
            timeElement.parentElement.style.color = '#ff4757';
            timeElement.parentElement.style.borderColor = '#ff4757';
            timeElement.parentElement.style.animation = 'pulse 1s infinite alternate';
        }

		if (count <= 0) {
			clearInterval(timers[itemNum]);
			timeElement.innerText = "Ended";
            timeElement.parentElement.style.animation = 'none';
            timeElement.parentElement.style.color = '#a0a0b0';
            timeElement.parentElement.style.borderColor = 'rgba(255,255,255,0.1)';

            // Disable bidding button
            const bidBtn = document.getElementById(`btn-bid${itemNum}`);
            bidBtn.classList.add('btn-disabled');
            bidBtn.innerHTML = '<i class="fa-solid fa-ban"></i> Auction Closed';
            bidBtn.onclick = null;

			// Handle winner
			let winnerDiv = document.getElementById(winnerId);
			let bids = bidHistories[itemNum];
			
			if (bids.length > 0) {
                const winningBid = bids[bids.length-1].amount;
				winnerDiv.innerHTML = `<i class="fa-solid fa-trophy text-gold"></i> Sold for ₹${winningBid.toLocaleString()}`;
                
                // Trigger Confetti Celebration if user won (simulating logic)
                triggerConfetti();
                showToast('Auction Ended!', `${bidNames[itemNum]} sold for ₹${winningBid.toLocaleString()}`, 'success');
			} else {
				winnerDiv.textContent = 'Ended with no bids.';
                winnerDiv.className = 'winner-message no-bids';
			}
		}
	}, 1000);
}

// Toast System
function showToast(title, message, type = 'default') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    
    let icon = 'fa-circle-check';
    if(type === 'success') icon = 'fa-trophy';
    
    toast.innerHTML = `
        <div class="toast-icon"><i class="fa-solid ${icon}"></i></div>
        <div class="toast-content">
            <h4>${title}</h4>
            <p>${message}</p>
        </div>
    `;
    
    container.appendChild(toast);
    
    // Auto remove
    setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => {
            if(container.contains(toast)) container.removeChild(toast);
        }, 500);
    }, 4000);
}

// Confetti Effect
function triggerConfetti() {
    if(typeof confetti === 'function') {
        const duration = 3000;
        const end = Date.now() + duration;

        (function frame() {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#d4af37', '#ffffff', '#4d7cff']
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#d4af37', '#ffffff', '#4d7cff']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    }
}

// Smooth Scrolling
function scrollToItems() {
	document.getElementById('auction-grid').scrollIntoView({ behavior: 'smooth' });
}

// Initialize Timers on Load
window.onload = () => {
    // Override default html values with actual seconds logic before starting
    const initialTimes = [120, 45, 90, 150];
    for(let i=1; i<=4; i++) {
        document.getElementById(`timer${i}`).innerText = initialTimes[i-1];
        startTimer(`timer${i}`, `winner${i}`, i.toString());
    }
};

// Add quick global style pulse effect
const style = document.createElement('style');
style.innerHTML = `
@keyframes pulse {
    0% { transform: scale(1); opacity: 1; }
    100% { transform: scale(1.05); opacity: 0.8; box-shadow: 0 0 15px #ff4757; }
}
`;
document.head.appendChild(style);
