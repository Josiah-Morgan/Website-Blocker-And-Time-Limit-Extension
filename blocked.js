$(document).ready(function() {
    let motivational_messages = [
        "Think about it.",
        "Let's do better next time.",
        "Take a moment to reflect.",
        "Time for a break.",
        "You know why you're doing this.",
        "Focus on what matters.",
        "Let's stay on track.",
        "You’ve got this, stay disciplined.",
        "Your goals are within reach.",
        "Remember what you’re working for.",
        "Success takes effort.",
        "You can do better.",
        "It’s all about self-control.",
        "Stay focused, stay strong.",
        "You're capable of more.",
        "Resist the distraction.",
        "Progress, not procrastination.",
        "This is part of the process.",
        "Small actions lead to big results.",
        "You’ve got goals—let’s reach them.",
        "Think long-term, not short-term.",
        "Keep pushing forward.",
        "Distractions won't help you grow.",
        "Stay in control, not the screen.",
        "Your future self will thank you.",
        "This is a test—pass it.",
        "Eyes on the prize.",
        "Every step counts.",
        "Break the cycle of distraction.",
        "You're stronger than this urge.",
        "Great things are built from small moments of discipline.",
        "Don't give in."
    ];

    function fadeInMessage() {
        let random_index = Math.floor(Math.random() * motivational_messages.length);
        let random_message = motivational_messages[random_index];
        let message_div = $('#motivational-message');
        
        message_div.text(random_message).fadeTo(2000, 1, function() {
            setTimeout(function() {
                message_div.fadeTo(2000, 0); 
            }, 4000); // Display the message for 4 seconds
        });
        
    }

    fadeInMessage();
});