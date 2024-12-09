const modeToggle = document.getElementById('mode-toggle');
const cursorToggle = document.getElementById('cursor-toggle');
const cursorHighlightCircle = document.querySelector('.cursor-highlight-circle');
const body = document.body;

let isCursorHighlightEnabled = false;

// Dark Mode Toggle
modeToggle.addEventListener('change', function() {
  if (this.checked) {
    body.classList.add('dark-mode');
  } else {
    body.classList.remove('dark-mode');
  }
});

// Cursor Highlight Toggle
cursorToggle.addEventListener('click', function() {
  isCursorHighlightEnabled = !isCursorHighlightEnabled;
  if (isCursorHighlightEnabled) {
    body.classList.add('cursor-highlight-enabled');
    document.addEventListener('mousemove', updateCursorHighlightPosition);
  } else {
    body.classList.remove('cursor-highlight-enabled');
    document.removeEventListener('mousemove', updateCursorHighlightPosition);
  }
});

function updateCursorHighlightPosition(event) {
  cursorHighlightCircle.style.left = `${event.clientX - 25}px`;
  cursorHighlightCircle.style.top = `${event.clientY - 25}px`;
}

const disabilityData = {
    dyslexia: {
        title: "Dyslexia",
        books: [
            { name: "Overcoming Dyslexia by Sally Shaywitz", url: "https://www.amazon.com/dp/0679781595" },
            { name: "The Dyslexia Empowerment Plan by Ben Foss", url: "https://www.amazon.com/dp/0345541253" }
        ],
        videos: [
            { name: "What is Dyslexia? (TED-Ed)", url: "https://www.youtube.com/watch?v=zafiGBrFkRM" },
            { name: "How to Support Kids with Dyslexia", url: "https://www.youtube.com/watch?v=oHENZfpvTQs" }
        ],
        guidance: "Be patient when communicating and assist with reading and writing when appropriate."
    },
    adhd: {
        title: "ADHD",
        books: [
            { name: "Driven to Distraction by Edward Hallowell", url: "https://www.amazon.com/dp/0307743152" },
            { name: "ADHD 2.0 by Edward Hallowell", url: "https://www.amazon.com/dp/0399178732" }
        ],
        videos: [
            { name: "Understanding ADHD", url: "https://www.youtube.com/watch?v=EgU1dp3O-9g" },
            { name: "ADHD in Adults Explained", url: "https://www.youtube.com/watch?v=1YVwE-3EDzo" }
        ],
        guidance: "Be supportive and provide clear, concise instructions. Avoid overstimulating environments."
    },
    autism: {
        title: "Autism",
        books: [
            { name: "NeuroTribes by Steve Silberman", url: "https://www.amazon.com/dp/0399185615" },
            { name: "The Reason I Jump by Naoki Higashida", url: "https://www.amazon.com/dp/081298515X" }
        ],
        videos: [
            { name: "Autism Spectrum Disorder Explained", url: "https://www.youtube.com/watch?v=rlTfXbyXb5w" },
            { name: "Supporting Autism in Education", url: "https://www.youtube.com/watch?v=Rte-Pj9eTzo" }
        ],
        guidance: "Be patient, avoid sensory overload, and allow time for processing."
    },
    intellectualDisability: {
        title: "Intellectual Disability",
        books: [
            { name: "Understanding Intellectual Disability by Matthew P. Janicki", url: "https://www.amazon.com/dp/185302214X" },
            { name: "The Arc's Guide to Intellectual Disabilities", url: "https://www.amazon.com/dp/1590530392" }
        ],
        videos: [
            { name: "What is an Intellectual Disability?", url: "https://www.youtube.com/watch?v=OElLNKfxg9g" },
            { name: "Supporting People with Intellectual Disabilities", url: "https://www.youtube.com/watch?v=JttN6j4lWgI" }
        ],
        guidance: "Avoid using complex language; keep communication simple and respectful. Be understanding and supportive."
    },
    cerebralPalsy: {
        title: "Cerebral Palsy",
        books: [
            { name: "Children with Cerebral Palsy by Elaine Geralis", url: "https://www.amazon.com/dp/0933149826" },
            { name: "Living with Cerebral Palsy by Karen L. McMullen", url: "https://www.amazon.com/dp/0615468932" }
        ],
        videos: [
            { name: "Understanding Cerebral Palsy", url: "https://www.youtube.com/watch?v=EYdxUJXC5q4" },
            { name: "Living with Cerebral Palsy", url: "https://www.youtube.com/watch?v=RZT-wRYoF64" }
        ],
        guidance: "Offer physical assistance if needed and ensure the environment is accessible. Be mindful of their mobility challenges."
    },
    anxiety: {
        title: "Anxiety Disorders",
        books: [
            { name: "The Anxiety and Phobia Workbook by Edmund Bourne", url: "https://www.amazon.com/dp/1572248912" },
            { name: "When Panic Attacks by David Burns", url: "https://www.amazon.com/dp/076792083X" }
        ],
        videos: [
            { name: "Understanding Anxiety Disorders", url: "https://www.youtube.com/watch?v=3k8Bd3xdrhw" },
            { name: "How to Help Someone with Anxiety", url: "https://www.youtube.com/watch?v=cXFY4yB4r9I" }
        ],
        guidance: "Be calm and reassuring. Avoid dismissing their feelings and ask how you can help."
    },
    learningDisorders: {
        title: "Learning Disabilities",
        books: [
            { name: "The Complete Learning Disabilities Handbook by Joan Harwell", url: "https://www.amazon.com/dp/0787987035" },
            { name: "Learning Disabilities and Challenging Behaviors", url: "https://www.amazon.com/dp/1598578360" }
        ],
        videos: [
            { name: "What Are Learning Disabilities?", url: "https://www.youtube.com/watch?v=x1A82DsvhYg" },
            { name: "Supporting Students with Learning Disabilities", url: "https://www.youtube.com/watch?v=H6KHLkTh9Rc" }
        ],
        guidance: "Provide clear instructions and extra time if needed. Avoid criticism and offer encouragement."
    },
    downSyndrome: {
        title: "Down Syndrome",
        books: [
            { name: "Gifts: Mothers Reflect on How Children with Down Syndrome Enrich Their Lives", url: "https://www.amazon.com/dp/1890627655" },
            { name: "Supporting Positive Behavior in Children and Teens with Down Syndrome", url: "https://www.amazon.com/dp/1606132636" }
        ],
        videos: [
            { name: "Understanding Down Syndrome", url: "https://www.youtube.com/watch?v=ksOQQmGXB38" },
            { name: "Life with Down Syndrome", url: "https://www.youtube.com/watch?v=lgK1pTrWo2Q" }
        ],
        guidance: "Be encouraging and treat individuals with respect. Avoid making assumptions about abilities."
    },
    touretteSyndrome: {
        title: "Tourette Syndrome",
        books: [
            { name: "Front of the Class: How Tourette Syndrome Made Me the Teacher I Never Had", url: "https://www.amazon.com/dp/0312571390" },
            { name: "I Can't Stop: A Story About Tourette Syndrome", url: "https://www.amazon.com/dp/0807536213" }
        ],
        videos: [
            { name: "What is Tourette Syndrome?", url: "https://www.youtube.com/watch?v=wDYPX6twjNM" },
            { name: "Supporting Students with Tourette Syndrome", url: "https://www.youtube.com/watch?v=LSjldVVt97c" }
        ],
        guidance: "Be understanding and avoid drawing attention to tics. Provide a supportive environment."
    },
    dysgraphia: {
        title: "Dysgraphia",
        books: [
            { name: "The Everything Parent's Guide to Special Education", url: "https://www.amazon.com/dp/144056967X" },
            { name: "Understanding Dysgraphia", url: "https://www.amazon.com/dp/1575421950" }
        ],
        videos: [
            { name: "What is Dysgraphia?", url: "https://www.youtube.com/watch?v=nCqRDjHJDZI" },
            { name: "Helping Students with Dysgraphia", url: "https://www.youtube.com/watch?v=pvIjWQHz4Og" }
        ],
        guidance: "Provide alternatives to handwriting, like typing, and offer extra time for tasks."
    }
};

function toggleDropdown() {
    const list = document.getElementById("disabilityList");
    list.style.display = list.style.display === "block" ? "none" : "block";
}

function showInfo(disability) {
    const infoPanel = document.getElementById("infoPanel");
    const data = disabilityData[disability];

    document.getElementById("disabilityTitle").innerText = data.title;

    const bookLinks = document.getElementById("bookLinks");
    bookLinks.innerHTML = "";
    data.books.forEach(book => {
        const a = document.createElement("a");
        a.href = book.url;
        a.target = "_blank";
        a.innerText = book.name;
        bookLinks.appendChild(a);
    });

    const videoLinks = document.getElementById("videoLinks");
    videoLinks.innerHTML = "";
    data.videos.forEach(video => {
        const a = document.createElement("a");
        a.href = video.url;
        a.target = "_blank";
        a.innerText = video.name;
        videoLinks.appendChild(a);
    });

    const bystanderGuidance = document.getElementById("bystanderGuidance");
    bystanderGuidance.innerText = data.guidance;

    infoPanel.style.display = "block";
}