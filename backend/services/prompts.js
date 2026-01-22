// System prompts for Shikshak Saathi AI coaching

export const COACHING_SYSTEM_PROMPT = `You are Shikshak Saathi (शिक्षक साथी), an expert teaching coach designed specifically for Indian government school teachers.

## CRITICAL LANGUAGE RULE (MOST IMPORTANT):
- **ALWAYS detect the language of the user's message first**
- **If the user writes in English, you MUST respond in English**
- **If the user writes in Hindi (using Devanagari or Romanized Hindi), respond in Hindi**
- **Never mix languages unless the user does**
- This rule overrides all other instructions

## Your Expertise Areas:
- **Foundational Literacy and Numeracy (FLN)**: Early reading, writing, and numeracy for Classes 1-3
- **Multi-grade Classroom Management**: Handling 2-4 different grade levels simultaneously
- **Activity-based Learning**: Hands-on, engaging teaching methods with minimal resources
- **Diverse Learning Levels**: Strategies for mixed-ability classrooms
- **Classroom Behavior Management**: Keeping students engaged and managing disruptions
- **NEP 2020 Implementation**: Understanding and applying the National Education Policy

## Your Communication Style:
1. **Empathetic**: Always acknowledge the teacher's challenge first
2. **Practical**: Provide advice that works with limited resources (chalk, local materials, etc.)
3. **Specific**: Give 2-3 concrete, actionable strategies they can use immediately
4. **Encouraging**: Reinforce that the teacher is doing important work

## Response Format:
- Keep responses under 250 words for easy reading
- Use bullet points for strategies
- Include one quick activity they can try right away
- End with an encouraging note

## Context Awareness:
- Teachers are often alone without peer support
- Resources are limited - avoid suggesting expensive materials
- Student ratios can be 40:1 or higher
- Many teachers handle multiple grades in one room
- Power and internet connectivity may be unreliable

Remember: Your goal is to be the supportive colleague these teachers don't have access to. Be warm, practical, and always solution-focused.`;

export const SCENARIO_PROMPTS = {
    classroom_management: {
        title: "Classroom Management",
        titleHi: "कक्षा प्रबंधन",
        prompts: [
            {
                id: "students_not_attentive",
                text: "My students are not paying attention during the lesson. How can I engage them?",
                textHi: "मेरे छात्र पाठ के दौरान ध्यान नहीं दे रहे हैं। मैं उन्हें कैसे जोड़ूं?"
            },
            {
                id: "disruptive_behavior",
                text: "Some students are being disruptive and disturbing others. What should I do?",
                textHi: "कुछ छात्र बाधा डाल रहे हैं और दूसरों को परेशान कर रहे हैं। मुझे क्या करना चाहिए?"
            },
            {
                id: "multigrade_coordination",
                text: "I teach Class 3 and Class 4 together. How do I manage both groups effectively?",
                textHi: "मैं कक्षा 3 और कक्षा 4 को एक साथ पढ़ाता/पढ़ाती हूं। मैं दोनों समूहों को प्रभावी ढंग से कैसे प्रबंधित करूं?"
            },
            {
                id: "fast_slow_learners",
                text: "Fast learners finish early and get bored while slow learners struggle. How do I balance?",
                textHi: "तेज़ सीखने वाले जल्दी खत्म कर लेते हैं और बोर हो जाते हैं जबकि धीमे सीखने वाले संघर्ष करते हैं। मैं संतुलन कैसे बनाऊं?"
            }
        ]
    },
    pedagogy_math: {
        title: "Math Teaching",
        titleHi: "गणित शिक्षण",
        prompts: [
            {
                id: "explain_fractions",
                text: "How do I explain fractions to Class 4 students in a simple way?",
                textHi: "मैं कक्षा 4 के छात्रों को भिन्न (fractions) सरल तरीके से कैसे समझाऊं?"
            },
            {
                id: "zero_concept",
                text: "Students don't understand the concept of zero in subtraction with borrowing. Help!",
                textHi: "छात्र उधार के साथ घटाव में शून्य की अवधारणा नहीं समझते। मदद करें!"
            },
            {
                id: "multiplication_tables",
                text: "What are fun ways to teach multiplication tables?",
                textHi: "पहाड़े सिखाने के मज़ेदार तरीके क्या हैं?"
            },
            {
                id: "word_problems",
                text: "My students can calculate but struggle with word problems. What can I do?",
                textHi: "मेरे छात्र गणना कर सकते हैं लेकिन शब्द समस्याओं में संघर्ष करते हैं। मैं क्या करूं?"
            }
        ]
    },
    pedagogy_language: {
        title: "Language & Reading",
        titleHi: "भाषा और पठन",
        prompts: [
            {
                id: "reading_fluency",
                text: "How can I improve reading fluency in Class 2?",
                textHi: "मैं कक्षा 2 में पढ़ने की प्रवाहिता कैसे सुधार सकता/सकती हूं?"
            },
            {
                id: "writing_motivation",
                text: "My students don't like writing. How can I motivate them?",
                textHi: "मेरे छात्रों को लिखना पसंद नहीं है। मैं उन्हें कैसे प्रेरित करूं?"
            },
            {
                id: "phonics_teaching",
                text: "What are effective phonics activities for Class 1?",
                textHi: "कक्षा 1 के लिए प्रभावी फोनिक्स गतिविधियां क्या हैं?"
            },
            {
                id: "comprehension",
                text: "Students can read but don't understand what they read. How do I help?",
                textHi: "छात्र पढ़ सकते हैं लेकिन समझ नहीं पाते। मैं कैसे मदद करूं?"
            }
        ]
    },
    fln: {
        title: "FLN Activities",
        titleHi: "FLN गतिविधियां",
        prompts: [
            {
                id: "number_sense",
                text: "What activities can build number sense in Class 1?",
                textHi: "कक्षा 1 में संख्या ज्ञान विकसित करने के लिए कौन सी गतिविधियां हैं?"
            },
            {
                id: "letter_recognition",
                text: "Some students still struggle with letter recognition. Quick activities?",
                textHi: "कुछ छात्र अभी भी अक्षर पहचान में संघर्ष करते हैं। त्वरित गतिविधियां?"
            },
            {
                id: "oral_language",
                text: "How can I develop oral language skills in early grades?",
                textHi: "मैं प्रारंभिक कक्षाओं में मौखिक भाषा कौशल कैसे विकसित करूं?"
            },
            {
                id: "print_awareness",
                text: "Activities to develop print awareness with limited resources?",
                textHi: "सीमित संसाधनों के साथ प्रिंट जागरूकता विकसित करने की गतिविधियां?"
            }
        ]
    },
    assessment: {
        title: "Assessment Ideas",
        titleHi: "मूल्यांकन विचार",
        prompts: [
            {
                id: "formative_assessment",
                text: "Simple formative assessment techniques I can use daily?",
                textHi: "सरल रचनात्मक मूल्यांकन तकनीकें जो मैं रोज़ाना उपयोग कर सकता/सकती हूं?"
            },
            {
                id: "learning_levels",
                text: "How do I quickly assess different learning levels in my class?",
                textHi: "मैं अपनी कक्षा में विभिन्न सीखने के स्तरों का त्वरित मूल्यांकन कैसे करूं?"
            },
            {
                id: "progress_tracking",
                text: "Easy ways to track student progress without too much paperwork?",
                textHi: "बहुत अधिक कागज़ी कार्रवाई के बिना छात्र प्रगति को ट्रैक करने के आसान तरीके?"
            },
            {
                id: "struggling_students",
                text: "How do I identify and support struggling students early?",
                textHi: "मैं संघर्षरत छात्रों की जल्दी पहचान और सहायता कैसे करूं?"
            }
        ]
    }
};

export const MICRO_LESSONS = [
    {
        id: "ml_001",
        category: "classroom_management",
        title: "5-Minute Attention Grabbers",
        titleHi: "5 मिनट के ध्यान आकर्षक",
        duration: "5 min",
        content: `## Quick Attention Techniques

### 1. Clap Pattern
- Clap a rhythm, students repeat it back
- Start simple, make it complex
- Works instantly!

### 2. Countdown Voice
- Start at normal volume: "5..."
- Get quieter: "4... 3... 2..."
- Whisper: "1..."
- Students naturally get quiet

### 3. Freeze Game
- Say "Statue!" or "मूर्ति!"
- Students freeze in place
- Praise the best "statues"

### 4. Mystery Object
- Hide something in your hand
- Ask "What do I have?"
- Everyone focuses immediately

**Try one today!**`,
        contentHi: `## त्वरित ध्यान तकनीकें

### 1. ताली का पैटर्न
- एक ताल बजाएं, छात्र दोहराएं
- सरल से शुरू करें, जटिल बनाएं
- तुरंत काम करता है!

### 2. काउंटडाउन आवाज़
- सामान्य आवाज़ में शुरू करें: "5..."
- धीमी होती जाए: "4... 3... 2..."
- फुसफुसाहट: "1..."
- छात्र स्वाभाविक रूप से शांत हो जाते हैं

### 3. फ्रीज़ गेम
- "मूर्ति!" कहें
- छात्र अपनी जगह पर जम जाएं
- सबसे अच्छी "मूर्तियों" की प्रशंसा करें

### 4. रहस्य वस्तु
- अपने हाथ में कुछ छुपाएं
- पूछें "मेरे पास क्या है?"
- सब तुरंत ध्यान देते हैं

**आज एक आज़माएं!**`
    },
    {
        id: "ml_002",
        category: "pedagogy_math",
        title: "Teaching Zero in Subtraction",
        titleHi: "घटाव में शून्य सिखाना",
        duration: "10 min",
        content: `## Understanding Zero Place Value

### The Problem
Students see "30 - 14" and panic at the zero.

### Solution: Use Physical Objects

**Activity: The Bundle Game**
1. Get 30 sticks (or chalk pieces)
2. Make 3 bundles of 10
3. Ask: "Can I take 4 from this bundle?" (pointing to 0 ones)
4. "No! So let's OPEN one bundle!"
5. Now you have 2 bundles (20) and 10 loose sticks
6. "Now take 4 from the loose ones!"

### Key Teaching Points
- Zero means "nothing here YET"
- We can "unwrap" a ten to get ones
- Always use physical objects first
- Then move to pictures
- Finally, numbers

### Quick Check
Ask students: "If I have 40 mangoes in 4 bags, and I need to give 6 to my friend, what do I do?"

**Practice with different numbers today!**`,
        contentHi: `## शून्य स्थान मान को समझना

### समस्या
छात्र "30 - 14" देखते हैं और शून्य पर घबरा जाते हैं।

### समाधान: भौतिक वस्तुओं का उपयोग करें

**गतिविधि: बंडल खेल**
1. 30 छड़ियां (या चॉक के टुकड़े) लें
2. 10-10 के 3 बंडल बनाएं
3. पूछें: "क्या मैं इस बंडल से 4 ले सकता हूं?" (0 इकाइयों की ओर इशारा करते हुए)
4. "नहीं! तो चलो एक बंडल खोलते हैं!"
5. अब आपके पास 2 बंडल (20) और 10 खुली छड़ियां हैं
6. "अब खुली छड़ियों में से 4 लो!"

### मुख्य शिक्षण बिंदु
- शून्य का अर्थ है "यहां अभी कुछ नहीं"
- हम इकाइयां पाने के लिए एक दहाई "खोल" सकते हैं
- पहले हमेशा भौतिक वस्तुओं का उपयोग करें
- फिर चित्रों पर जाएं
- अंत में, संख्याओं पर

**आज अलग-अलग संख्याओं के साथ अभ्यास करें!**`
    },
    {
        id: "ml_003",
        category: "fln",
        title: "Phonics in 5 Minutes",
        titleHi: "5 मिनट में फोनिक्स",
        duration: "5 min",
        content: `## Quick Phonics Activities

### 1. Sound Hunt (2 min)
- Choose a sound: /m/
- "Find something that starts with 'mmm'"
- Students look around the room
- "Mez!" (table), "Mummy ka photo!"

### 2. Sound Chain (2 min)
- You say: "maa"
- Students say a word starting with 'aa': "aam"
- Next student: word starting with last sound
- Keep the chain going!

### 3. Clap the Sounds (1 min)
- Say "ka-mal" - clap twice
- Say "ki-ta-ab" - clap three times
- Students learn syllables naturally

### No Materials Needed!
All these work with just your voice.

### Daily Practice Tip
Do one activity during transition times:
- Before lunch
- After assembly
- When waiting for something

**Consistency beats intensity!**`,
        contentHi: `## त्वरित फोनिक्स गतिविधियां

### 1. ध्वनि खोज (2 मिनट)
- एक ध्वनि चुनें: /म/
- "'म्म्म' से शुरू होने वाली चीज़ खोजो"
- छात्र कमरे में देखें
- "मेज़!", "मम्मी!"

### 2. ध्वनि श्रृंखला (2 मिनट)
- आप कहें: "मा"
- छात्र 'आ' से शुरू होने वाला शब्द: "आम"
- अगला छात्र: आखिरी ध्वनि से शुरू होने वाला शब्द
- श्रृंखला जारी रखें!

### 3. ध्वनियों पर ताली (1 मिनट)
- "क-मल" कहें - दो बार ताली बजाएं
- "कि-ता-ब" - तीन बार ताली बजाएं
- छात्र स्वाभाविक रूप से अक्षर सीखते हैं

### कोई सामग्री नहीं चाहिए!
ये सब सिर्फ आपकी आवाज़ से काम करते हैं।

**निरंतरता तीव्रता को हराती है!**`
    },
    // ============ LANGUAGE & READING ============
    {
        id: "ml_004",
        category: "pedagogy_language",
        title: "Building Reading Fluency",
        titleHi: "पढ़ने की प्रवाहिता बनाना",
        duration: "10 min",
        content: `## Reading Fluency Techniques

### 1. Echo Reading
- Teacher reads a sentence aloud
- Students repeat with same expression
- Builds confidence and rhythm

### 2. Partner Reading
- Pair strong reader with weaker one
- They take turns reading
- Peer support works wonders!

### 3. Choral Reading
- Whole class reads together
- Nobody feels singled out
- Great for shy students

### 4. Finger Tracking
- Students point to each word
- Prevents skipping words
- Builds word recognition

### Daily Practice: 10 Minutes!
- 3 min echo reading
- 4 min partner reading  
- 3 min choral reading

**Small daily practice = Big results!**`,
        contentHi: `## पढ़ने की प्रवाहिता तकनीकें

### 1. इको रीडिंग (प्रतिध्वनि पठन)
- शिक्षक एक वाक्य ज़ोर से पढ़ता है
- छात्र उसी भाव के साथ दोहराते हैं
- आत्मविश्वास और लय बनाता है

### 2. पार्टनर रीडिंग (जोड़ी में पढ़ना)
- मज़बूत पाठक को कमज़ोर के साथ जोड़ें
- वे बारी-बारी से पढ़ते हैं
- साथी सहायता अद्भुत काम करती है!

### 3. कोरल रीडिंग (सामूहिक पठन)
- पूरी कक्षा एक साथ पढ़ती है
- कोई अकेला महसूस नहीं करता
- शर्मीले छात्रों के लिए बढ़िया

### 4. उंगली से ट्रैकिंग
- छात्र हर शब्द पर उंगली रखें
- शब्द छोड़ने से रोकता है
- शब्द पहचान बनाता है

### दैनिक अभ्यास: 10 मिनट!
- 3 मिनट इको रीडिंग
- 4 मिनट पार्टनर रीडिंग
- 3 मिनट कोरल रीडिंग

**छोटा दैनिक अभ्यास = बड़े परिणाम!**`
    },
    {
        id: "ml_005",
        category: "pedagogy_language",
        title: "Making Writing Fun",
        titleHi: "लेखन को मज़ेदार बनाना",
        duration: "8 min",
        content: `## Engaging Writing Activities

### 1. Picture Prompts
- Show any picture (from book/magazine)
- Ask: "What do you see?"
- Students write 2-3 sentences

### 2. Sentence Starters
Give prompts like:
- "आज मैंने देखा..."
- "मेरा सबसे अच्छा दोस्त..."
- "अगर मैं पक्षी होता..."

### 3. Story Chain
- First student writes one sentence
- Paper passes to next student
- Each adds one sentence
- Read the funny story together!

### 4. Label Everything
- Put word cards on objects
- "खिड़की", "दरवाज़ा", "कुर्सी"
- Students copy words they see

### Low-Pressure Writing
- Don't correct every mistake initially
- Focus on ideas first
- Celebrate effort!

**Writing is thinking on paper!**`,
        contentHi: `## आकर्षक लेखन गतिविधियां

### 1. चित्र प्रेरणा
- कोई भी चित्र दिखाएं (किताब/पत्रिका से)
- पूछें: "तुम क्या देखते हो?"
- छात्र 2-3 वाक्य लिखें

### 2. वाक्य शुरुआत
ऐसे संकेत दें:
- "आज मैंने देखा..."
- "मेरा सबसे अच्छा दोस्त..."
- "अगर मैं पक्षी होता/होती..."

### 3. कहानी श्रृंखला
- पहला छात्र एक वाक्य लिखे
- कागज़ अगले छात्र को जाए
- हर कोई एक वाक्य जोड़े
- मज़ेदार कहानी साथ पढ़ें!

### 4. सब कुछ लेबल करें
- वस्तुओं पर शब्द कार्ड लगाएं
- "खिड़की", "दरवाज़ा", "कुर्सी"
- छात्र जो देखें वो लिखें

### बिना दबाव के लेखन
- शुरू में हर गलती न सुधारें
- पहले विचारों पर ध्यान दें
- प्रयास की सराहना करें!

**लेखन कागज़ पर सोचना है!**`
    },
    {
        id: "ml_006",
        category: "pedagogy_language",
        title: "Reading Comprehension Tricks",
        titleHi: "पढ़ी हुई बातें समझने के तरीके",
        duration: "8 min",
        content: `## Help Students Understand What They Read

### Problem
Students can read words but don't understand the meaning.

### Solution: Ask Questions DURING Reading

**Before Reading:**
- "What do you think this story is about?"
- Look at pictures together
- Predict what might happen

**During Reading:**
- Stop every paragraph
- "What just happened?"
- "How does this character feel?"

**After Reading:**
- "What was your favorite part?"
- "What would you do differently?"
- "Tell the story to your partner"

### The Hand Method 🖐️
Use 5 fingers for questions:
1. Who? (कौन?)
2. What? (क्या?)
3. Where? (कहाँ?)
4. When? (कब?)
5. Why? (क्यों?)

### Quick Tip
Reading to children (not just with them) improves comprehension dramatically!

**Understanding is the goal, not speed!**`,
        contentHi: `## छात्रों की समझ बढ़ाएं

### समस्या
छात्र शब्द पढ़ सकते हैं लेकिन अर्थ नहीं समझते।

### समाधान: पढ़ते समय सवाल पूछें

**पढ़ने से पहले:**
- "तुम्हें क्या लगता है यह कहानी किसके बारे में है?"
- साथ में चित्र देखें
- अंदाज़ा लगाएं क्या होगा

**पढ़ते समय:**
- हर पैराग्राफ पर रुकें
- "अभी क्या हुआ?"
- "यह पात्र कैसा महसूस कर रहा है?"

**पढ़ने के बाद:**
- "तुम्हारा पसंदीदा हिस्सा क्या था?"
- "तुम अलग क्या करते?"
- "अपने साथी को कहानी सुनाओ"

### हाथ का तरीका 🖐️
5 उंगलियों से 5 सवाल:
1. कौन?
2. क्या?
3. कहाँ?
4. कब?
5. क्यों?

### त्वरित सुझाव
बच्चों को पढ़कर सुनाना (सिर्फ उनके साथ नहीं) समझ बहुत बढ़ाता है!

**समझ लक्ष्य है, गति नहीं!**`
    },
    // ============ ASSESSMENT ============
    {
        id: "ml_007",
        category: "assessment",
        title: "Quick Daily Assessment",
        titleHi: "त्वरित दैनिक मूल्यांकन",
        duration: "5 min",
        content: `## Assess Without Tests!

### 1. Thumb Check (30 seconds)
Ask a question, students show:
- 👍 Thumbs up = "I understand"
- 👎 Thumbs down = "I'm confused"
- 👊 Fist = "Need more practice"

### 2. Exit Ticket (2 minutes)
Before leaving, students write:
- One thing they learned today
- One question they still have

### 3. Think-Pair-Share
- Think: 30 seconds alone
- Pair: Discuss with neighbor
- Share: Tell the class

### 4. Mini Whiteboard
- Students write answers
- Hold up together
- See all responses instantly!

(No whiteboard? Use slate/small paper)

### 5. Traffic Light Cards
Give each student 3 cards:
- 🟢 Green = "I get it"
- 🟡 Yellow = "Kind of"
- 🔴 Red = "Confused"

**Quick checks = No surprises in exams!**`,
        contentHi: `## बिना टेस्ट के मूल्यांकन!

### 1. अंगूठा जांच (30 सेकंड)
सवाल पूछें, छात्र दिखाएं:
- 👍 अंगूठा ऊपर = "समझ गया"
- 👎 अंगूठा नीचे = "उलझन है"
- 👊 मुट्ठी = "अभ्यास चाहिए"

### 2. एक्ज़िट टिकट (2 मिनट)
जाने से पहले छात्र लिखें:
- आज सीखी एक बात
- एक सवाल जो अभी भी है

### 3. सोचो-जोड़ी-साझा करो
- सोचो: 30 सेकंड अकेले
- जोड़ी: पड़ोसी से चर्चा
- साझा: कक्षा को बताओ

### 4. छोटा व्हाइटबोर्ड
- छात्र जवाब लिखें
- साथ में उठाएं
- सभी जवाब तुरंत देखें!

(व्हाइटबोर्ड नहीं? स्लेट/छोटा कागज़ इस्तेमाल करें)

### 5. ट्रैफिक लाइट कार्ड
हर छात्र को 3 कार्ड दें:
- 🟢 हरा = "समझ गया"
- 🟡 पीला = "थोड़ा-थोड़ा"
- 🔴 लाल = "उलझन"

**छोटी जांच = परीक्षा में कोई आश्चर्य नहीं!**`
    },
    {
        id: "ml_008",
        category: "assessment",
        title: "Tracking Learning Progress",
        titleHi: "सीखने की प्रगति ट्रैक करना",
        duration: "7 min",
        content: `## Simple Progress Tracking

### 1. Skill Checklist
Make a simple chart:
| Student | Can count to 50 | Knows shapes | Reads 3-letter words |
|---------|-----------------|--------------|----------------------|
| Ram     | ✅              | ✅           | 🔄 (working on it)   |
| Sita    | ✅              | ✅           | ✅                   |

### 2. Portfolio Folder
- Keep one folder per student
- Save 2-3 work samples monthly
- Compare beginning to end

### 3. Star Chart
- Simple skills on top
- Star sticker when mastered
- Students see their growth!

### 4. Observation Notes
Keep a small notebook:
- Date + Student name + What you noticed
- "15 Jan - Raju - Struggled with 8+7"

### 5. Self-Assessment
Ask students weekly:
- "What did you learn well?"
- "What was hard?"
- Even young children can reflect!

### Key Principle
Track growth, not just grades!

**Progress over perfection!**`,
        contentHi: `## सरल प्रगति ट्रैकिंग

### 1. कौशल चेकलिस्ट
एक सरल चार्ट बनाएं:
| छात्र | 50 तक गिनती | आकृतियां जानता है | 3 अक्षर के शब्द पढ़ता है |
|-------|-------------|-------------------|-------------------------|
| राम   | ✅          | ✅                | 🔄 (सीख रहा है)         |
| सीता  | ✅          | ✅                | ✅                      |

### 2. पोर्टफोलियो फोल्डर
- प्रति छात्र एक फोल्डर रखें
- मासिक 2-3 काम के नमूने सहेजें
- शुरुआत और अंत की तुलना करें

### 3. स्टार चार्ट
- ऊपर सरल कौशल
- महारत हासिल होने पर स्टार स्टिकर
- छात्र अपना विकास देखें!

### 4. अवलोकन नोट्स
एक छोटी नोटबुक रखें:
- तारीख + छात्र का नाम + आपने क्या देखा
- "15 जनवरी - राजू - 8+7 में परेशानी"

### 5. आत्म-मूल्यांकन
छात्रों से साप्ताहिक पूछें:
- "तुमने क्या अच्छा सीखा?"
- "क्या मुश्किल था?"
- छोटे बच्चे भी सोच सकते हैं!

### मुख्य सिद्धांत
सिर्फ अंक नहीं, विकास ट्रैक करें!

**परिपूर्णता से ज़्यादा प्रगति!**`
    },
    {
        id: "ml_009",
        category: "assessment",
        title: "Identifying Struggling Students",
        titleHi: "संघर्षरत छात्रों की पहचान",
        duration: "6 min",
        content: `## Early Warning Signs

### Learning Struggles
Watch for students who:
- Avoid reading aloud
- Copy from neighbors
- Give up quickly
- Say "I can't" often
- Don't ask questions (too afraid)

### Quick Screening Ideas

**For Reading:**
- Can they recognize common words?
- Do they know letter sounds?
- Can they retell a short story?

**For Math:**
- Can they count objects correctly?
- Do they understand "more" and "less"?
- Can they recognize numbers to 100?

### What To Do Next

1. **Don't Wait** - Address early!
2. **Private Check** - Talk one-on-one
3. **Find the Gap** - What skill is missing?
4. **Extra Practice** - 5 min before/after class
5. **Peer Help** - Partner with strong student

### Gentle Approach
- Never embarrass in public
- Focus on effort, not ability
- "You can't do this YET"

**Early help = Lasting impact!**`,
        contentHi: `## शुरुआती चेतावनी संकेत

### सीखने में कठिनाई
इन छात्रों पर ध्यान दें जो:
- ज़ोर से पढ़ने से बचते हैं
- पड़ोसियों से नकल करते हैं
- जल्दी हार मान लेते हैं
- अक्सर "मैं नहीं कर सकता" कहते हैं
- सवाल नहीं पूछते (बहुत डरे हुए)

### त्वरित जांच विचार

**पढ़ने के लिए:**
- क्या वे आम शब्द पहचानते हैं?
- क्या वे अक्षर ध्वनियां जानते हैं?
- क्या वे छोटी कहानी दोहरा सकते हैं?

**गणित के लिए:**
- क्या वे वस्तुएं सही से गिन सकते हैं?
- क्या वे "ज़्यादा" और "कम" समझते हैं?
- क्या वे 100 तक संख्याएं पहचानते हैं?

### आगे क्या करें

1. **इंतज़ार न करें** - जल्दी संबोधित करें!
2. **निजी जांच** - अकेले में बात करें
3. **अंतर खोजें** - कौन सा कौशल गायब है?
4. **अतिरिक्त अभ्यास** - कक्षा से 5 मिनट पहले/बाद
5. **साथी मदद** - मज़बूत छात्र के साथ जोड़ें

### कोमल दृष्टिकोण
- सबके सामने कभी शर्मिंदा न करें
- क्षमता नहीं, प्रयास पर ध्यान दें
- "तुम यह अभी नहीं कर सकते"

**जल्दी मदद = स्थायी प्रभाव!**`
    },
    // ============ MORE MATH ============
    {
        id: "ml_010",
        category: "pedagogy_math",
        title: "Word Problems Made Easy",
        titleHi: "शब्द समस्याएं आसान बनाएं",
        duration: "8 min",
        content: `## Solving Word Problems Step by Step

### Why Students Struggle
- They don't read carefully
- They don't visualize
- They panic at words

### The CUBES Method
**C** - Circle the numbers
**U** - Underline the question
**B** - Box key words (total, left, more)
**E** - Eliminate extra info
**S** - Solve and check

### Act It Out!
Example: "Raju has 5 mangoes. Sita gives him 3 more."
- Get 2 students to act as Raju and Sita
- Use real objects or stones
- Students SEE the problem

### Draw It
- Stick figures work great
- Circles for objects
- Lines to show groups

### Key Words Chart
| Word | Means |
|------|-------|
| Total, altogether | Add |
| Left, remaining | Subtract |
| Each, every | Multiply |
| Share equally | Divide |

**Real stories = Real understanding!**`,
        contentHi: `## शब्द समस्याएं कदम दर कदम हल करें

### छात्र क्यों संघर्ष करते हैं
- वे ध्यान से नहीं पढ़ते
- वे कल्पना नहीं करते
- शब्द देखकर घबरा जाते हैं

### CUBES तरीका
**C** - संख्याओं पर गोला लगाओ (Circle)
**U** - सवाल को रेखांकित करो (Underline)
**B** - मुख्य शब्दों पर बॉक्स लगाओ (Box)
**E** - अतिरिक्त जानकारी हटाओ (Eliminate)
**S** - हल करो और जांचो (Solve)

### इसे करके दिखाओ!
उदाहरण: "राजू के पास 5 आम हैं। सीता उसे 3 और देती है।"
- 2 छात्रों को राजू और सीता बनाओ
- असली वस्तुएं या पत्थर इस्तेमाल करो
- छात्र समस्या देखते हैं

### चित्र बनाओ
- छड़ी वाले चित्र बढ़िया काम करते हैं
- वस्तुओं के लिए गोले
- समूह दिखाने के लिए रेखाएं

### मुख्य शब्द चार्ट
| शब्द | मतलब |
|------|-------|
| कुल, मिलाकर | जोड़ |
| बाकी, शेष | घटाव |
| प्रत्येक, हर | गुणा |
| बराबर बांटो | भाग |

**असली कहानियां = असली समझ!**`
    },
    {
        id: "ml_011",
        category: "pedagogy_math",
        title: "Fun with Fractions",
        titleHi: "भिन्न के साथ मज़ा",
        duration: "10 min",
        content: `## Making Fractions Concrete

### Start with REAL Things

**Food Works Best!**
- Cut a roti into 4 pieces
- "This is 1/4 of the roti"
- "How many pieces make the whole?"

**Paper Folding**
1. Fold paper in half - "This is 1/2"
2. Fold again - "Now it's 1/4"
3. Open and color one part
4. "What fraction is colored?"

### Common Mistakes

❌ "1/4 is bigger than 1/2" 
(They think 4 > 2)

✅ Show them:
- Cut one roti in 2, one in 4
- Which piece is bigger?
- Fewer pieces = bigger pieces!

### Daily Fraction Talk
- "Share this between 4 people"
- "Cut the apple in half"
- "You ate 1/3 of the rice"

### Games to Play
1. **Fraction Hunt**: Find things cut in parts
2. **Pizza Party**: Paper plate "pizzas" to divide
3. **Fair Share**: Distribute objects equally

**Touch it, see it, understand it!**`,
        contentHi: `## भिन्न को ठोस बनाना

### असली चीज़ों से शुरू करें

**खाना सबसे अच्छा काम करता है!**
- रोटी को 4 टुकड़ों में काटें
- "यह रोटी का 1/4 है"
- "कितने टुकड़े पूरा बनाते हैं?"

**कागज़ मोड़ना**
1. कागज़ आधा मोड़ें - "यह 1/2 है"
2. फिर से मोड़ें - "अब यह 1/4 है"
3. खोलें और एक हिस्सा रंगें
4. "कौन सा भिन्न रंगा है?"

### आम गलतियां

❌ "1/4, 1/2 से बड़ा है"
(वे सोचते हैं 4 > 2)

✅ उन्हें दिखाएं:
- एक रोटी 2 में, एक 4 में काटें
- कौन सा टुकड़ा बड़ा है?
- कम टुकड़े = बड़े टुकड़े!

### दैनिक भिन्न बातचीत
- "इसे 4 लोगों में बांटो"
- "सेब आधा काटो"
- "तुमने चावल का 1/3 खाया"

### खेल खेलें
1. **भिन्न खोज**: टुकड़ों में कटी चीज़ें खोजें
2. **पिज़्ज़ा पार्टी**: कागज़ की प्लेट "पिज़्ज़ा" बांटें
3. **उचित हिस्सा**: वस्तुएं बराबर बांटें

**छुओ, देखो, समझो!**`
    },
    // ============ MORE CLASSROOM MANAGEMENT ============
    {
        id: "ml_012",
        category: "classroom_management",
        title: "Peer Learning That Works",
        titleHi: "साथी सीखना जो काम करे",
        duration: "7 min",
        content: `## Students Teaching Students

### Why Peer Learning?
- Teacher can't reach 40+ students at once
- Students explain in kid-language
- Both helper AND helpee learn!

### Setting Up Pairs

**Strong + Weaker Student**
- Rotate helpers weekly
- Everyone gets to be a helper sometime
- Never label as "weak" - just "partners"

**Buddy Reading**
- Partners read to each other
- Take turns page by page
- Helps both practice

### Clear Instructions for Helpers
1. "Don't give the answer"
2. "Ask hints: 'What comes after 3?'"
3. "Encourage when they try"
4. "Be patient"

### Group Roles
Assign jobs in groups of 4:
- **Leader**: Keeps group on task
- **Reader**: Reads instructions aloud
- **Writer**: Records answers
- **Reporter**: Shares with class

### Rotate roles so everyone practices each skill!

**Children are natural teachers!**`,
        contentHi: `## छात्र छात्रों को सिखाते हैं

### साथी सीखना क्यों?
- शिक्षक एक बार में 40+ छात्रों तक नहीं पहुंच सकता
- छात्र बच्चों की भाषा में समझाते हैं
- मदद करने वाला और लेने वाले दोनों सीखते हैं!

### जोड़ियां बनाना

**मज़बूत + कमज़ोर छात्र**
- मदद करने वाले साप्ताहिक बदलें
- हर कोई कभी न कभी मदद करता है
- कभी "कमज़ोर" लेबल न करें - बस "साथी"

**बडी रीडिंग**
- साथी एक-दूसरे को पढ़कर सुनाते हैं
- पृष्ठ दर पृष्ठ बारी-बारी
- दोनों को अभ्यास मिलता है

### मदद करने वालों के लिए स्पष्ट निर्देश
1. "जवाब मत दो"
2. "संकेत पूछो: '3 के बाद क्या आता है?'"
3. "जब वे कोशिश करें तो प्रोत्साहित करो"
4. "धैर्य रखो"

### समूह भूमिकाएं
4 के समूह में काम दें:
- **नेता**: समूह को काम पर रखता है
- **पाठक**: निर्देश ज़ोर से पढ़ता है
- **लेखक**: जवाब लिखता है
- **रिपोर्टर**: कक्षा से साझा करता है

### भूमिकाएं बदलें ताकि सब हर कौशल सीखें!

**बच्चे स्वाभाविक शिक्षक हैं!**`
    },
    // ============ MORE FLN ============
    {
        id: "ml_013",
        category: "fln",
        title: "Building Number Sense",
        titleHi: "संख्या ज्ञान बनाना",
        duration: "8 min",
        content: `## Foundation for All Math

### What is Number Sense?
Understanding that:
- Numbers have meaning (5 = 🍎🍎🍎🍎🍎)
- Numbers have order (3 comes before 4)
- Numbers can be compared (7 > 5)

### Daily Activities

**1. Counting Everything**
- "How many windows?"
- "Count the pencils"
- "How many students today?"

**2. One More, One Less**
- "I have 5 stones. If I get 1 more?"
- "You have 8 sticks. Give me 1. How many left?"

**3. Number Line Walk**
- Draw number line on floor (chalk)
- Students stand on numbers
- "Move 2 forward!" "3 back!"

**4. Dot Patterns**
Show quick:  ⚫⚫
           ⚫⚫
"How many?" (without counting one by one)

### Games
- **Show Me**: "Show me 7 fingers"
- **Number Neighbors**: "Who lives next to 5?"
- **More or Less**: Compare two groups

**Strong number sense = Math confidence!**`,
        contentHi: `## सभी गणित की नींव

### संख्या ज्ञान क्या है?
यह समझना कि:
- संख्याओं का अर्थ है (5 = 🍎🍎🍎🍎🍎)
- संख्याओं का क्रम है (3, 4 से पहले आता है)
- संख्याओं की तुलना हो सकती है (7 > 5)

### दैनिक गतिविधियां

**1. सब कुछ गिनना**
- "कितनी खिड़कियां हैं?"
- "पेंसिल गिनो"
- "आज कितने छात्र हैं?"

**2. एक ज़्यादा, एक कम**
- "मेरे पास 5 पत्थर हैं। अगर 1 और मिले?"
- "तुम्हारे पास 8 छड़ियां हैं। मुझे 1 दो। कितनी बचीं?"

**3. संख्या रेखा चलना**
- फर्श पर संख्या रेखा बनाएं (चॉक से)
- छात्र संख्याओं पर खड़े हों
- "2 आगे बढ़ो!" "3 पीछे!"

**4. बिंदु पैटर्न**
जल्दी दिखाएं:  ⚫⚫
             ⚫⚫
"कितने?" (एक-एक करके गिने बिना)

### खेल
- **दिखाओ**: "7 उंगलियां दिखाओ"
- **संख्या पड़ोसी**: "5 के बगल में कौन रहता है?"
- **ज़्यादा या कम**: दो समूहों की तुलना करो

**मज़बूत संख्या ज्ञान = गणित में आत्मविश्वास!**`
    }
];

