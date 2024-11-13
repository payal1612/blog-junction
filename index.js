const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require("uuid");

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
const port = 8080;

let posts = [
    { 
        id: uuidv4(), 
        username: "Payal", 
        title: "Five Ways to Resolve Any Issues", 
        content: [
            "Life and work often bring challenges that require clear and structured approaches to find solutions. Whether the issue is personal, professional, or academic, these five strategies can guide you toward a constructive resolution.",
            
            "1. Define the Problem Clearly: A precise understanding of the issue is essential to prevent wasting time on irrelevant details or overlooking the actual problem. Start by writing down what the issue is. Describe it in as much detail as possible and identify the core problem. Ask yourself questions like: What is happening? Why is this an issue? Who or what is affected? Example: If you’re struggling with a work deadline, the issue might not just be time management but also unclear project priorities or a lack of resources.",
            
            "2. Break Down the Problem into Manageable Parts: Large problems can feel overwhelming, but breaking them into smaller parts makes them easier to handle and solve step-by-step. Divide the problem into smaller tasks or components, and address each one individually. Prioritize each part based on urgency or complexity. Example: If your issue is improving grades, break it down into specific steps like setting study schedules, seeking help in challenging subjects, and taking practice tests.",
            
            "3. Identify Possible Solutions and Evaluate Them: Having multiple solutions allows flexibility and helps in choosing the most effective approach. Brainstorm potential solutions, including conventional methods and creative ideas. List the pros and cons of each option. Ask yourself: What are the likely outcomes of each solution? What are the risks involved? How feasible is each option? Example: If you’re facing a technical issue at work, possible solutions might include reaching out to IT support, researching online tutorials, or consulting with a colleague who has handled similar issues.",
            
            "4. Take Action with a Plan: A well-structured action plan keeps you focused and organized, ensuring you don’t stray from the chosen path. Outline the steps needed to implement the selected solution, assign deadlines, and set checkpoints. Start with the easiest task to gain momentum, then move to the more complex ones. Example: If you’re trying to reduce expenses, plan to analyze your spending habits, cut out unnecessary costs, and create a monthly budget.",
            
            "5. Review and Reflect on the Outcome: Evaluating the results helps you learn from the experience and refine your problem-solving skills for future challenges. After implementing the solution, review what worked and what didn’t. Reflect on any adjustments needed or alternative actions for similar issues in the future. Example: If you resolved a team conflict, observe the team dynamics over time and note if the solution has lasting effects. Reflect on what approaches contributed most to the resolution.",
            
            "Conclusion: Resolving issues doesn’t have to be an overwhelming process. By defining the problem, breaking it down, brainstorming solutions, creating an action plan, and reflecting on the outcome, you can approach challenges with a structured mindset and grow your problem-solving abilities. Whether in daily life or at work, these steps make any issue seem more manageable and approachable."
        ]


    },
    { id: uuidv4(), username: "Emily Harper", title: "Your Health, Your Choice: Empowering Wellness Decisions", 
        content:[ "In today’s fast-paced world, making conscious decisions about your health is empowering. Every choice you make, from what you eat to how you manage stress, impacts your overall well-being. Here’s how you can take charge:",

                   " 1) Nutrition: Focus on a balanced diet with fresh fruits, vegetables, and lean proteins to fuel your body and mind.",

                    "2)Exercise: Regular physical activity improves energy, boosts mood, and supports long-term health. Find an activity you enjoy and stay consistent.", 

                    "3)Mental Health: Stress management and self-care are key. Incorporate practices like meditation, journaling, and talking to loved ones to keep your mind healthy.",
                    
                    "4)Sleep: Quality sleep is essential for overall health. Aim for 7-9 hours per night and create a calming bedtime routine.",
                    
                    "5)Preventative Care: Regular check-ups and screenings help detect health issues early. Prioritize preventative health measures.",
                   
                    "6)Taking small steps each day leads to lasting results. You have the power to make choices that enhance your health—every decision matters!" ]},



    { id: uuidv4(), username: "John Doe", title: "Mind Over Matter: How to Develop a Strong and Empowering Mindset",
         content: ["Your mindset plays a pivotal role in how you navigate life’s challenges and pursue success. A strong and empowering mindset allows you to overcome obstacles, achieve your goals, and maintain a positive outlook, even in tough situations. Here's how you can develop and nurture a mindset that will empower you:",
           " 1. Embrace a Growth Mindset:  A growth mindset is the belief that abilities and intelligence can be developed through effort and perseverance. When you adopt this mindset, you start seeing challenges as opportunities to learn and grow. Rather than feeling defeated by setbacks, you focus on improving with each experience.",
            
           " 2. Build Resilience: Resilience is the ability to bounce back from adversity and keep moving forward. Life is filled with setbacks, but resilient individuals don’t let failures define them—they learn from them. Developing resilience helps you stay positive and keep pushing through difficult times.",
            
           " 3. Set Clear and Achievable Goals: Clear goals give you a sense of direction and purpose, helping you stay focused. Breaking larger goals into smaller, achievable steps makes them feel more manageable and less overwhelming. Tracking your progress and celebrating small wins will keep you motivated and on track.",
            
           " 4. Practice Positive Self-Talk:The way you talk to yourself has a direct impact on your mindset. Negative self-talk can hinder your confidence and limit your potential, but positive self-talk can boost your belief in your abilities. Replacing self-doubt with affirmations can significantly change how you approach challenges.",
            
           " 5. Surround Yourself with Positivity:The people you spend time with and the environment you surround yourself with influence your mindset. Engage with supportive and like-minded individuals who inspire and challenge you to grow. A positive environment encourages motivation, creativity, and a resilient mindset.",
            
            "6. Focus on What You Can Control: There will always be factors outside your control, but focusing on what you can influence empowers you to take action. When you concentrate on your actions, attitude, and effort, you feel more in control of your life and its outcomes. This mindset reduces stress and boosts confidence.",
            
            "7. Practice Gratitude: Gratitude shifts your focus from what you lack to what you have. Practicing gratitude daily helps you appreciate the small victories and fosters a positive mindset. Acknowledging the good in your life, even in difficult times, helps you stay hopeful and optimistic.",
          ]}
];

app.get("/posts", (req, res) => {
    console.log(posts); // Check if title is present
    res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/posts", (req, res) => {
    const { username, title, content } = req.body;
    const id = uuidv4();
    
    // Split the content by newlines to convert it into an array of paragraphs
    const formattedContent = content.split('\n').map(paragraph => paragraph.trim()).filter(paragraph => paragraph);

    posts.push({ id, title, username, content: formattedContent });
    res.redirect("/posts");
});



app.get("/posts/:id", (req, res) => {
    const { id } = req.params;
    const post = posts.find((p) => p.id === id);

    console.log("Requested Post:", post); // Check format here

    if (post) {
        res.render("show.ejs", { post });
    } else {
        res.status(404).send("Post not found");
    }
});


app.listen(port, () => {
    console.log("Server running on port", port);
});  

