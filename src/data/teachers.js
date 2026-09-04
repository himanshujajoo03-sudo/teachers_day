/**
 * 🎓 TEACHER'S DAY FACULTY DIRECTORY
 * 
 * Strict Faculty Name Format:
 * First name initial + Middle name initial + Full surname + Sir/Ma'am
 * 
 * Fields:
 * - slug: string (URL path: /teacher/[slug])
 * - fullName: string (internal reference)
 * - displayName: string (user-facing formatted name)
 * - name: string (alias to displayName for compatibility)
 * - photo: string (URL or relative path)
 * - message: string (Heartfelt personalized appreciation message)
 */

export const teachers = [
  {
    slug: "faculty-01",
    fullName: "Dr. Zeeshan Ibtesam Khan",
    displayName: "Z. I. Khan Sir",
    name: "Z. I. Khan Sir",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
    message: "Some teachers teach us lessons, but a few leave behind something much more valuable — confidence, perspective, and memories we carry with us. Your presence has always brought a sense of guidance and reassurance whenever we needed it. We may not always say it, but the things we learn from you go far beyond the classroom. Thank you for being someone we can genuinely look up to. Happy Teacher’s Day, Sir! 🤍"
  },
  {
    slug: "faculty-02",
    fullName: "Dr. Vivek Bhaskarrao Kute",
    displayName: "V. B. Kute Sir",
    name: "V. B. Kute Sir",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80",
    message: "Every student remembers a few teachers who made their journey a little easier, a little better, and a lot more meaningful. You are definitely one of those teachers for us. Your way of guiding students and the calmness you bring makes a lasting impression. Thank you for sharing not just knowledge, but also your experience and perspective with us. We are truly grateful to have had your guidance. Happy Teacher’s Day, Sir! 🌿"
  },
  {
    slug: "faculty-03",
    fullName: "Mrs. Kavita Kapil Nagariya",
    displayName: "K. K. Nagariya Ma'am",
    name: "K. K. Nagariya Ma'am",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80",
    message: "Behind every confident student is often a teacher who believed in them before they completely believed in themselves. Your kindness, patience, and way of encouraging students have made a difference that words cannot fully explain. The little moments, advice, and support you have given us will stay with us for a long time. Thank you for being such a warm and memorable part of our journey. Wishing you a very Happy Teacher’s Day, Ma'am! 🌸"
  },
  {
    slug: "faculty-04",
    fullName: "Dr. Nikhil Chandrakant Mhala",
    displayName: "N. C. Mhala Sir",
    name: "N. C. Mhala Sir",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=80",
    message: "Good teachers give knowledge, but great teachers leave students with something to think about long after the class is over. Your guidance has given us many such moments. Thank you for always being a part of our learning journey and for helping us become a little more confident with every step. We truly appreciate everything you have done for us. Happy Teacher’s Day, Sir! ✨"
  },
  {
    slug: "faculty-05",
    fullName: "Mr. Avinash Pundlikrao Ingle",
    displayName: "A. P. Ingle Sir",
    name: "A. P. Ingle Sir",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80",
    message: "College becomes more memorable because of the people who make an impression along the way, and you are certainly one of them. Your guidance, conversations, and the way you interact with students have given us moments we will remember. Thank you for always contributing something meaningful to our journey. We may move ahead, but the lessons and memories you have given us will stay. Happy Teacher’s Day, Sir! 🤍"
  },
  {
    slug: "faculty-06",
    fullName: "Ms. Sneha Ramesh Sontakke",
    displayName: "S. R. Sontakke Ma'am",
    name: "S. R. Sontakke Ma'am",
    photo: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&auto=format&fit=crop&q=80",
    message: "Sometimes a teacher’s impact is not seen immediately; we realize it later, when a piece of advice suddenly makes sense or a difficult moment feels easier because of something we were taught. Your presence has been a meaningful part of our journey. Thank you for your patience, encouragement, and for always giving us something valuable to take forward. Happy Teacher’s Day, Ma'am! 🌷"
  },
  {
    slug: "faculty-07",
    fullName: "Ms. Renu Krushnarao Pawar",
    displayName: "R. K. Pawar Ma'am",
    name: "R. K. Pawar Ma'am",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&auto=format&fit=crop&q=80",
    message: "A teacher becomes special not only through what they teach, but through the way students feel around them. Your guidance and supportive presence have made many moments of our journey better. Thank you for being someone whose words we can learn from and whose efforts we genuinely appreciate. We are lucky to have memories and lessons connected with you. Wishing you a beautiful Happy Teacher’s Day, Ma'am! 💐"
  },
  {
    slug: "faculty-08",
    fullName: "Mr. Vipin Rajendra Khawale",
    displayName: "V. R. Khawale Sir",
    name: "V. R. Khawale Sir",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=80",
    message: "Behind every lesson there are countless small efforts that students may not always notice, but they definitely benefit from. We appreciate all those efforts and the guidance you have given us throughout our journey. Thank you for helping us learn, improve, and keep moving forward. Your contribution to our college life is something we will always remember with gratitude. Happy Teacher’s Day, Sir! 🌟"
  },
  {
    slug: "faculty-09",
    fullName: "Mr. Sandeep Bhanudasji Damodhare",
    displayName: "S. B. Damodhare Sir",
    name: "S. B. Damodhare Sir",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=80",
    message: "Some moments from college fade with time, while others become memories we smile about later. The moments connected with teachers are often among the ones that stay. Thank you for being a part of those memories and for guiding us through our journey. Your presence and support have meant more than we may have expressed. Wishing you a very Happy Teacher’s Day, Sir! 🤍"
  },
  {
    slug: "faculty-10",
    fullName: "Ms. Simran Sudama Khatri",
    displayName: "S. S. Khatri Ma'am",
    name: "S. S. Khatri Ma'am",
    photo: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=500&auto=format&fit=crop&q=80",
    message: "Teaching is not simply about standing in front of a class; it is about influencing the people sitting there, one interaction at a time. Your guidance has been a meaningful part of our student life. Thank you for your patience, your support, and for everything you have contributed to our growth. We truly appreciate having you as one of the teachers we will remember. Happy Teacher’s Day, Ma'am! 🌸"
  },
  {
    slug: "faculty-11",
    fullName: "Ms. Pranoti Anilrao Shirbhate",
    displayName: "P. A. Shirbhate Ma'am",
    name: "P. A. Shirbhate Ma'am",
    photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&auto=format&fit=crop&q=80",
    message: "Every teacher leaves a different kind of impression, and yours is one that we will carry with us. Thank you for all the encouragement, guidance, and little moments that have made our college journey more meaningful. Even when we don't express it often, students notice the effort teachers put in for them. Today is a small way of saying that we notice, we appreciate, and we are grateful. Happy Teacher’s Day, Ma'am! 💗"
  },
  {
    slug: "faculty-12",
    fullName: "Ms. Aparna Shankarrao Kalaskar",
    displayName: "A. S. Kalaskar Ma'am",
    name: "A. S. Kalaskar Ma'am",
    photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&auto=format&fit=crop&q=80",
    message: "Looking back at our college journey, we realize how many people quietly contribute to making us better versions of ourselves. You have been one of those people. Thank you for every bit of guidance, every word of encouragement, and every effort you have made for your students. Your role in our journey is something we will always value. Wishing you a heartfelt Happy Teacher’s Day, Ma'am! 🌷"
  },
  {
    slug: "faculty-13",
    fullName: "Ms. Samiksha Pravin Sambhe",
    displayName: "S. P. Sambhe Ma'am",
    name: "S. P. Sambhe Ma'am",
    photo: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=500&auto=format&fit=crop&q=80",
    message: "Some teachers become a part of our memories without us even realizing it at the time. Your presence, guidance, and interactions have created many such moments for us. Thank you for being a part of our journey and for helping us grow through your support and experience. We hope this little surprise reminds you that your efforts are remembered and appreciated. Happy Teacher’s Day, Ma'am! 🤍"
  },
  {
    slug: "faculty-14",
    fullName: "Ms. Ruchita Ashokrao Kalamkar",
    displayName: "R. A. Kalamkar Ma'am",
    name: "R. A. Kalamkar Ma'am",
    photo: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=500&auto=format&fit=crop&q=80",
    message: "A good teacher can make a difference in a student’s day, but a memorable teacher can make a difference in their journey. Thank you for being a meaningful part of ours. Your guidance and the time you have given to students are genuinely appreciated. We may not say thank you enough, so today we wanted to say it a little differently. Happy Teacher’s Day, Ma'am! 🌼"
  },
  {
    slug: "faculty-15",
    fullName: "Ms. Kalyani Vijayrao Bokade",
    displayName: "K. V. Bokade Ma'am",
    name: "K. V. Bokade Ma'am",
    photo: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=500&auto=format&fit=crop&q=80",
    message: "Behind every student’s journey are teachers who patiently guide them through both easy and difficult moments. Thank you for being one of those guiding people in our lives. Your efforts, support, and presence have added something valuable to our college experience. We hope you know that your contribution does not go unnoticed. Sending you our warmest wishes on Teacher’s Day, Ma'am! 💐"
  },
  {
    slug: "faculty-16",
    fullName: "Ms. Vedanti Umeshrao Deshmukh",
    displayName: "V. U. Deshmukh Ma'am",
    name: "V. U. Deshmukh Ma'am",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
    message: "Years from now, we may forget many details of college life, but we will remember the people who made those years meaningful. Teachers are an important part of those memories, and we are grateful to have you as one of ours. Thank you for your guidance, patience, and constant efforts. May you always receive the same appreciation and respect that you give to your students. Happy Teacher’s Day, Ma'am! ✨"
  },
  {
    slug: "faculty-17",
    fullName: "Ms. Neha Wamanrao Bandabuche",
    displayName: "N. W. Bandabuche Ma'am",
    name: "N. W. Bandabuche Ma'am",
    photo: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=500&auto=format&fit=crop&q=80",
    message: "Teaching leaves an impact that often continues long after students leave the classroom. The guidance and values we receive become small parts of who we eventually become. Thank you for being a part of that process for us. Your efforts and support are truly appreciated, even if we don't always express them. Wishing you happiness, appreciation, and a very Happy Teacher’s Day, Ma'am! 🌸"
  },
  {
    slug: "faculty-18",
    fullName: "Ms. Aishwarya Vilas Kadu",
    displayName: "A. V. Kadu Ma'am",
    name: "A. V. Kadu Ma'am",
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=80",
    message: "Every teacher adds a different color to a student’s journey, and your presence has added its own special one to ours. Thank you for all the moments of guidance, encouragement, and learning you have shared with us. We are grateful for the time and effort you put into your students. May this Teacher’s Day remind you just how much your work is valued. Happy Teacher’s Day, Ma'am! 🤍"
  },
  {
    slug: "faculty-19",
    fullName: "Ms. Shivani Devendra Vaidya",
    displayName: "S. D. Vaidya Ma'am",
    name: "S. D. Vaidya Ma'am",
    photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80",
    message: "Behind every successful student are many people who helped them along the way, and teachers hold a very special place among them. Thank you for being a part of our journey and for sharing your time, experience, and guidance with us. The impact of a teacher is not always visible immediately, but it stays with students in ways they discover later. Happy Teacher’s Day, Ma'am! 🌷"
  },
  {
    slug: "faculty-20",
    fullName: "Ms. Shivani Vinod Dhoke",
    displayName: "S. V. Dhoke Ma'am",
    name: "S. V. Dhoke Ma'am",
    photo: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=500&auto=format&fit=crop&q=80",
    message: "Today is a reminder to appreciate the people who have helped shape our journey, and we are genuinely grateful to count you among them. Thank you for your guidance, your patience, and for all the effort you put into your students. We hope this small surprise brings a smile to your face, just as your presence has brought many meaningful moments to ours. Happy Teacher’s Day, Ma'am! 💐"
  },
  {
    slug: "faculty-21",
    fullName: "Prof. Juilie B Kale",
    displayName: "J. B. Kale Ma'am",
    name: "J. B. Kale Ma'am",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=80",
    message: "College life is not just about where we are today, but also about finding the confidence to take the next step. Thank you for being someone who helps students look beyond the present and believe in what they can become. Your guidance, encouragement, and support make the journey towards our future feel a little less uncertain. We truly appreciate everything you do for us. Happy Teacher’s Day, Ma'am! 🤍"
  },
  {
    slug: "faculty-22",
    fullName: "Prof. Shruti A Walde",
    displayName: "S. A. Walde Ma'am",
    name: "S. A. Walde Ma'am",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80",
    message: "There are teachers who help us learn, and then there are those who help us believe that we are capable of more than we think. Your guidance has been a valuable part of our journey towards the future. Thank you for always encouraging us to take opportunities, face challenges, and keep moving forward. We are grateful for the confidence and direction you bring to students. Happy Teacher’s Day, Ma'am! ✨"
  }
];

// Automatically derive facultyNumber (1–22) from the slug for image lookup
teachers.forEach((t, idx) => {
  const match = t.slug.match(/faculty-?(\d+)/i);
  t.facultyNumber = match ? parseInt(match[1], 10) : idx + 1;
});

export const getTeacherBySlug = (slug) => {
  return teachers.find(
    (t) => t.slug.toLowerCase() === (slug || '').toLowerCase()
  );
};
