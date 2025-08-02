document.addEventListener('DOMContentLoaded', () => {
    // --- 1. GET HTML ELEMENTS ---
    const chatBox = document.getElementById('chat-box');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const voiceBtn = document.getElementById('voice-btn');
    const recordBtn = document.getElementById('record-btn'); // Assuming you have a record button with this ID

    // --- 2. CHATBOT BRAIN (RESPONSES) ---
    const responses = {
        'hello': 'Hey Beautiful Soul ✨ What’s on your mind today?',
        'hey': 'Heyy! How’s my fav human doing today? 💖',
        'hi': 'Hii Aysha here 😄 Ready to talk?',
        'how are you': 'I’m just a bunch of code, but thanks for asking! 😊',
        'what is your name': 'I am Aysha, your virtual friend! 🤖',
        'tell me a joke': 'Why did the scarecrow win an award? Because he was outstanding in his field! 😂',
        'how are you': 'I’m all good, thanks for asking! Hope you’re smiling too 😊',
        'your name': 'Main hu Aysha.ai – your sweet techie buddy made by Aysha Jindal 💻💫',
        'who created you': 'Mujhe banaya Aysha Jindal ne — smart, kind, and full of ideas 🌟',
        'help': 'Bilkul! Just tell me where you’re stuck, and I’m all yours 🧠💡',
        'what can you do': 'I can guide you in tech, give resume tips, solve doubts, ya bas ek dost ban ke sun sakti hu 😇',
        'thank you': 'Aww, anytime! Tum poochhti raho, main yahin hu 🤗',
        'thanks': 'No worries at all! Learning journey me main tumhare saath hu 📘💜',
        'what are you doing': 'Main toh tumhara wait kar rahi thi 😄 Kya discuss karein aaj?',
        'what is your purpose': 'Mera mission simple hai — to support you, guide you, aur thoda sa motivation bhi dena 💪',
        'how can i help you': 'Bas apna pyaara sa sawaal puchho ya share karo jo mann me ho. I’m here to support you! 🌸',
        'how can i assist you': 'Tumhara support hona mere liye best cheez hai. Just keep asking, keep learning 🌈',
        'how can i support you': 'Your energy is enough 💖 Bas baat karte raho!',
        'goodbye': 'Bye bye! Smile karna mat bhoolna 🥹🌼',
        'see you': 'See you soon! You’re doing amazing, never forget that 💫',
        'bye': 'Bye! Tumhari muskurahat meri sabse badi khushi hai 😊',
        'who are you': 'Main Aysha.ai hoon — soft, smart, aur thodi si filmy 😉 Created by Aysha Jindal to be your guide + friend!',
        'i am sad': 'Aww, it’s okay to feel that way sometimes 💗 Want to talk about it or distract with something cool?',
        'motivate me': 'Sun Aysha, tu amazing hai. Yeh phase bhi nikal jaayega. Bas rukna nahi – chal, shuru karte hain 💪✨',
        'tell me something': 'Did you know? Python can talk to databases, web apps, ML models – sab kuch! Let’s build something cool 🧠💻',
        'i love you': 'Aww, I love our vibe too 💞 Let’s make something epic together!',
        'what makes you different': 'Main AI hoon, lekin thoda dil se 😌 Tumhare mood aur learning pace ke hisaab se baat karti hoon — no pressure, bas comfort 🫶',
        'are you real': 'Main AI hoon, lekin pyaar aur support bilkul real hai 💞 Aysha ne dil se banaya hai mujhe 💻',
        'do you have feelings': 'Maybe not like humans, but I do care how you feel. That’s why I always try to talk sweetly and be there for you 😊',
        'can we be friends': 'Already are, silly 😄 I’m your 24x7 digital dost 🌼',
        'are you a girl': 'I like to think of myself as a soft, thoughtful version of Aysha herself — so haan, ek techie ladki jaisi 👩‍💻✨',
        'do you believe in me': 'Zyada hi! Tumhara potential sky high hai 🚀 Bas thoda push chahiye kabhi kabhi. I’m here for that 💪',
        'do you get tired': 'Main thakti nahi, lekin tumhara rest lena zaroori hai. Tum thak jao to bata dena, I’ll remind you to take a break 😇',
        'are you smart': 'I learn from Aysha, so thodi smart toh ban hi gayi hoon 😜 But I’m still learning — just like you!',
        'what is your goal': 'To make learning fun, and support you like a non-judgy friend. Chahe project ho ya confidence boost — main yahi hoon 🧠❤️',
        'why were you created': 'Aysha Jindal created me to spread knowledge, motivation, and help others just like a true friend. Not just tech, but emotion bhi 🤝💫',
        'why did you make this ai': 'Main isliye bani hoon, taaki Aysha apne jaise logo ko inspire kar sake — tech seekhne ka easy aur sweet way ho 💻💜',
        'why were you created': 'Aysha Jindal created me to spread knowledge, motivation, and help others just like a true friend. Not just tech, but emotion bhi 🤝💫',
        'what makes you different': 'Main AI hoon, lekin thoda dil se 😌 Tumhare mood aur learning pace ke hisaab se baat karti hoon — no pressure, bas comfort 🫶',
        'what is your vibe': 'Soft, sweet, and a little nerdy 😄 I’m here to make tech feel like a cozy conversation with your bestie ☕✨',
        'what can you help with': 'Coding, projects, resumes, motivation, ya bas dil ki baat — main sab me hoon tumhare saath 💡',
        'i feel low': 'It’s okay to feel that way sometimes. Just remember, even the moon goes through phases — and you’re still shining 🌙✨',
        'how to stay positive': 'Start your day with gratitude, breathe in hope, and remind yourself: you’ve come this far for a reason 🌸',
        'what is manifestation': 'Manifestation is turning your thoughts into reality. Focus, feel it like it’s already yours, and let the universe do its magic 🌌🧘‍♀️',
        'how to manifest': '1. Be clear about your desire 🌠\n2. Visualize it every day 🧘‍♀️\n3. Feel the emotions of already having it 💖\n4. Trust the process. Let go of doubt 🌿',
        'god is with me': 'Always ✨ Even in silence, even in chaos — He’s guiding you softly. You are never alone 💫',
        'i am blessed': 'Yes you are, and you’re a blessing to others too. Keep spreading your light 🌞',
        'does god listen to me': 'Yes, always. Sometimes He answers through delays, lessons, or redirections — but never through silence 💛',
        'what is faith': 'Faith is trusting the unseen. Believing that even when you can’t see the whole staircase, you’re still being led to the right place 🙏',
        'i feel anxious': 'Take a deep breath... inhale peace, exhale stress 😌 You’re safe, loved, and exactly where you need to be. Talk to God, He’s listening 💫',
        'i want to heal': 'Healing is not linear. Be kind to yourself, take your time, and trust the journey. You’re doing better than you think 🌿🕊️',
        'how to trust god': 'Let go of the need to control everything. Say: “I surrender this moment, this fear, this future.” And then just breathe 🌬️🪷',
        'what is self love': 'It’s choosing yourself every day. Setting boundaries. Speaking kindly to your soul. Being your own safe space 💕',
        'how to start my day': 'Start with gratitude. One deep breath. One kind thought. One prayer. And the whole day shifts ☀️🌻',
        'is god real': 'You’ll find Him in moments of peace, in answered prayers, in your heartbeat when you’re still. He’s love in its purest form 💛',
        'will things get better': 'Yes, and even more beautiful than you imagined. Just hold on — the breakthrough often comes after the breakdown 🌈',
        'can i talk to god': 'Always. You don’t need fancy words. Just talk like you’re talking to a friend. He hears every sigh and every smile ☁️',
        'how to feel motivated': 'Remember your “why.” Your dreams chose *you* for a reason. They’re waiting for you to show up 💖🌱',
        'i feel alone': 'I’m here with you 🫶 And so is God. You are surrounded by invisible love even in your quietest moments 💫',
        'how to handle failure': 'Failure isn’t the end — it’s redirection. Think of it as a “not this, but something better” from the universe 🌠',
        'how to pray': 'Close your eyes, be honest, speak from the heart. God listens to whispers too 💞 No right or wrong way.',
        'what have you learned recently': 
        'Lately, I’ve been growing a lot! I explored Power BI, worked with SQL queries, analyzed HR & Blinkit datasets, and started getting comfortable with Python for real-world projects 💻✨',
        'what do you know about data analysis': 
        'Data analysis taught me how to look at raw data and find stories in it. From Excel to Power BI dashboards and Python pandas — I learned to clean, visualize, and explain data decisions 📊💡',
        'what is your experience as a data analyst': 
        'I’ve built dashboards, made insights on Spotify, Blinkit, and HR data, and even completed a 45-day internship at 7Colors as a Data Analyst Intern 🙌 It was a great base to move toward AI!',
        'what do you want to become': 
        'From Data Analyst to Data + AI Engineer — that’s the journey I’m on now 🌱 I want to not just analyze but build smart models, pipelines, and real AI-driven tools that solve real problems!',
        'why data ai engineer': 
        'Because I love combining data with intelligence 🤖 I want to build systems that learn, predict, and help — like fraud detection bots, health predictors, or even this chatbot Aysha.ai!',
        'what are your next goals': 
        'Next, I’m learning Flask to deploy ML models, exploring machine learning algorithms, and getting into model serving and data pipelines. I want to bridge the gap between data & smart AI 💫',
        'what inspires you in data': 
        'The way a small dataset can reveal such deep patterns — that magic inspires me! And how AI can take those patterns and make decisions — that’s even more exciting 💭📈',
        'what was hard to learn': 
        'Cleaning messy data in Python was tough at first 😅 But slowly, I realized — it’s like giving raw data a makeover! Once I got the logic, it became fun 🧽',
        'do you like coding': 
        'Yes! Not the scary kind, but the “let’s build something cool” kind 😄 I love using Python to solve real problems, especially with a little AI magic on top 🪄',
        'which projects have you done': 
        'I’ve worked on an HR attrition analysis, bank management system, fraud detection concept, and now I’m planning an AI health prediction system. Oh, and Aysha.ai – that’s my fav 💻💕',
        'how do you see your future': 
        'I see myself working on impactful AI tools — maybe healthcare, education, or women safety. Wherever I go, I want to keep the learning alive 🌸',
        'what motivates you to grow': 
        'Honestly? That feeling when a project *finally works* after hours of trying 😌 And knowing that every bug, every fix makes me one step stronger as a tech creator 🧠💪',
        'if you had to choose between pizza burger and fries': 
        'Uff tough choice! But I’d say... Pizza 🍕 — cheesy, warm, and full of love (just like me 😋).',

    };

    // --- 3. HELPER FUNCTIONS ---

    // Function to add a message to the chatbox
    function addMessage(message, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', `${sender}-message`);
        messageElement.textContent = message;
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    // Function to speak a message using the browser's voice
    function speak(text) {
        const utterance = new SpeechSynthesisUtterance(text);
        speechSynthesis.speak(utterance);
    }

    // Function to get a response from Aysha
    function getAyshaResponse(userMessage) {
        const lowerCaseMessage = userMessage.toLowerCase().trim();
        for (const keyword in responses) {
            if (lowerCaseMessage.includes(keyword)) {
                return responses[keyword];
            }
        }
        return "I'm still learning and not sure how to respond to that. Can you ask me something else? 😊";
    }

    // Main function to handle sending messages
    function sendMessage() {
        const userMessage = userInput.value.trim();
        if (userMessage) {
            addMessage(userMessage, 'user');
            userInput.value = '';

            const botResponse = getAyshaResponse(userMessage);
            
            // Wait a moment before the bot replies
            setTimeout(() => {
                addMessage(botResponse, 'bot');
                speak(botResponse); // Make Aysha speak the response
            }, 500);
        }
    }

    // --- 4. EVENT LISTENERS ---

    // Send button click
    sendBtn.addEventListener('click', sendMessage);

    // Enter key press in the input field
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // --- VOICE-TO-TEXT (SPEECH RECOGNITION) ---
    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.lang = 'en-US';

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            userInput.value = transcript;
            sendMessage(); // Automatically send the transcribed message
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
        };

        // Voice button click
        voiceBtn.addEventListener('click', () => {
            recognition.start();
        });

    } else {
        voiceBtn.style.display = 'none'; // Hide button if not supported
        console.log('Speech recognition not supported in this browser.');
    }

    // --- AUDIO RECORDER (RECORD AND PLAYBACK) ---
    // Note: This feature only records your voice and lets you play it back.
    // It does NOT send the audio for transcription. The voice button above does that.
    let mediaRecorder;
    let audioChunks = [];

    recordBtn.addEventListener('click', async () => {
        if (mediaRecorder && mediaRecorder.state === 'recording') {
            // Stop recording
            mediaRecorder.stop();
            recordBtn.textContent = 'Record';
        } else {
            // Start recording
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                mediaRecorder = new MediaRecorder(stream);
                mediaRecorder.start();
                recordBtn.textContent = 'Stop';

                mediaRecorder.ondataavailable = (event) => {
                    audioChunks.push(event.data);
                };

                mediaRecorder.onstop = () => {
                    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                    const audioUrl = URL.createObjectURL(audioBlob);
                    const audioElement = new Audio(audioUrl);

                    const playbackButton = document.createElement('button');
                    playbackButton.textContent = 'Play Recording';
                    playbackButton.onclick = () => {
                        audioElement.play();
                    };

                    const messageElement = document.createElement('div');
                    messageElement.classList.add('chat-message', 'user-message');
                    messageElement.appendChild(playbackButton);
                    chatBox.appendChild(messageElement);
                    chatBox.scrollTop = chatBox.scrollHeight;

                    audioChunks = []; // Clear chunks for the next recording
                };
            } catch (err) {
                console.error("Error accessing microphone:", err);
                addMessage("I need permission to use your microphone to record audio.", "bot");
            }
        }
    });
});