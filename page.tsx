"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function WorkoutPlanPage() {
  const router = useRouter()
  const [quizData, setQuizData] = useState(null)
  const [workoutPlan, setWorkoutPlan] = useState({
    equipmentNeeded: "",
    weeklySplit: [],
    dayWiseRoutine: {},
    resources: [],
  })
  const [isClient, setIsClient] = useState(false)
  const [imagesLoaded, setImagesLoaded] = useState({
    hypertrophyInfographic: true,
    youthExerciseInfographic: true,
  })

  // Set isClient to true when component mounts
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Retrieve quiz data and generate personalized plan
  useEffect(() => {
    if (isClient) {
      try {
        // Retrieve quiz data from localStorage
        const savedData = localStorage.getItem("quizData")
        if (savedData) {
          const parsedData = JSON.parse(savedData)
          setQuizData(parsedData)

          // Generate personalized workout plan based on quiz data
          generateWorkoutPlan(parsedData)
        } else {
          // If no quiz data, redirect to quiz
          router.push("/quiz")
        }
      } catch (error) {
        console.error("Error loading quiz data:", error)
      }
    }
  }, [router, isClient])

  // Handle image loading errors
  const handleImageError = (imageName) => {
    setImagesLoaded((prev) => ({
      ...prev,
      [imageName]: false,
    }))
  }

  // Function to generate personalized workout plan based on quiz answers
  const generateWorkoutPlan = (data) => {
    const plan = {
      equipmentNeeded: "",
      weeklySplit: [],
      dayWiseRoutine: {},
      resources: [],
    }

    // Equipment needed based on equipment access
    if (data.equipmentAccess === "Bodyweight only") {
      plan.equipmentNeeded = "No equipment required. All exercises can be performed using your bodyweight only."
    } else if (data.equipmentAccess === "Dumbbells & resistance bands") {
      plan.equipmentNeeded = "A set of adjustable dumbbells (5-25kg) and resistance bands of varying tensions."
    } else if (data.equipmentAccess === "Home gym with basic equipment") {
      plan.equipmentNeeded = "Dumbbells, barbell with weight plates, pull-up bar, and a bench."
    } else if (data.equipmentAccess === "Full commercial gym") {
      plan.equipmentNeeded = "Full range of equipment including machines, free weights, cables, and cardio equipment."
    } else {
      plan.equipmentNeeded = "Basic equipment including dumbbells and resistance bands."
    }

    // Weekly split based on training days and fitness level
    if (data.trainingDays === "2-3 days") {
      plan.weeklySplit = ["Full Body (Day 1)", "Rest", "Full Body (Day 2)", "Rest", "Full Body (Day 3)", "Rest", "Rest"]
    } else if (data.trainingDays === "4 days") {
      plan.weeklySplit = ["Upper Body", "Lower Body", "Rest", "Upper Body", "Lower Body", "Rest", "Rest"]
    } else if (data.trainingDays === "5 days") {
      plan.weeklySplit = ["Push", "Pull", "Legs", "Rest", "Upper Body", "Lower Body", "Rest"]
    } else if (data.trainingDays === "6+ days") {
      plan.weeklySplit = ["Push", "Pull", "Legs", "Push", "Pull", "Legs", "Rest"]
    } else {
      plan.weeklySplit = ["Full Body", "Rest", "Full Body", "Rest", "Full Body", "Rest", "Rest"]
    }

    // Day-wise routine based on equipment access and fitness level
    if (data.equipmentAccess === "Bodyweight only") {
      plan.dayWiseRoutine = {
        "Full Body": [
          { exercise: "Push-ups", sets: "3-4", reps: "8-12" },
          { exercise: "Bodyweight Squats", sets: "3-4", reps: "12-15" },
          { exercise: "Plank", sets: "3", reps: "30-60 sec" },
          { exercise: "Mountain Climbers", sets: "3", reps: "20 per side" },
          { exercise: "Glute Bridges", sets: "3", reps: "15-20" },
        ],
        "Upper Body": [
          { exercise: "Push-ups (various hand positions)", sets: "4", reps: "8-12" },
          { exercise: "Inverted Rows", sets: "3", reps: "8-12" },
          { exercise: "Pike Push-ups", sets: "3", reps: "8-12" },
          { exercise: "Superman Hold", sets: "3", reps: "20-30 sec" },
        ],
        "Lower Body": [
          { exercise: "Bodyweight Squats", sets: "4", reps: "15-20" },
          { exercise: "Walking Lunges", sets: "3", reps: "10-12 per leg" },
          { exercise: "Single-Leg Glute Bridges", sets: "3", reps: "10-15 per leg" },
          { exercise: "Calf Raises", sets: "3", reps: "15-20" },
        ],
      }
    } else if (data.equipmentAccess === "Full commercial gym") {
      plan.dayWiseRoutine = {
        Push: [
          { exercise: "Bench Press", sets: "4", reps: "8-10" },
          { exercise: "Incline Dumbbell Press", sets: "3", reps: "10-12" },
          { exercise: "Shoulder Press", sets: "3", reps: "8-10" },
          { exercise: "Tricep Pushdowns", sets: "3", reps: "12-15" },
          { exercise: "Lateral Raises", sets: "3", reps: "12-15" },
        ],
        Pull: [
          { exercise: "Deadlifts", sets: "4", reps: "6-8" },
          { exercise: "Pull-ups/Lat Pulldowns", sets: "3", reps: "8-12" },
          { exercise: "Seated Rows", sets: "3", reps: "10-12" },
          { exercise: "Face Pulls", sets: "3", reps: "12-15" },
          { exercise: "Bicep Curls", sets: "3", reps: "12-15" },
        ],
        Legs: [
          { exercise: "Squats", sets: "4", reps: "8-10" },
          { exercise: "Romanian Deadlifts", sets: "3", reps: "10-12" },
          { exercise: "Leg Press", sets: "3", reps: "10-12" },
          { exercise: "Leg Extensions", sets: "3", reps: "12-15" },
          { exercise: "Calf Raises", sets: "3", reps: "15-20" },
        ],
        "Upper Body": [
          { exercise: "Bench Press", sets: "4", reps: "8-10" },
          { exercise: "Bent Over Rows", sets: "4", reps: "8-10" },
          { exercise: "Overhead Press", sets: "3", reps: "8-10" },
          { exercise: "Pull-ups/Lat Pulldowns", sets: "3", reps: "8-12" },
          { exercise: "Tricep Extensions", sets: "3", reps: "12-15" },
          { exercise: "Bicep Curls", sets: "3", reps: "12-15" },
        ],
        "Lower Body": [
          { exercise: "Squats", sets: "4", reps: "8-10" },
          { exercise: "Romanian Deadlifts", sets: "3", reps: "10-12" },
          { exercise: "Lunges", sets: "3", reps: "10 per leg" },
          { exercise: "Leg Curls", sets: "3", reps: "12-15" },
          { exercise: "Calf Raises", sets: "3", reps: "15-20" },
        ],
        "Full Body": [
          { exercise: "Squats", sets: "3", reps: "8-10" },
          { exercise: "Bench Press", sets: "3", reps: "8-10" },
          { exercise: "Bent Over Rows", sets: "3", reps: "8-10" },
          { exercise: "Overhead Press", sets: "3", reps: "8-10" },
          { exercise: "Romanian Deadlifts", sets: "3", reps: "10-12" },
        ],
      }
    } else {
      // Default routine for other equipment options
      plan.dayWiseRoutine = {
        "Full Body": [
          { exercise: "Goblet Squats", sets: "3-4", reps: "10-12" },
          { exercise: "Dumbbell Bench Press", sets: "3-4", reps: "8-12" },
          { exercise: "Dumbbell Rows", sets: "3", reps: "10-12 per arm" },
          { exercise: "Dumbbell Shoulder Press", sets: "3", reps: "8-12" },
          { exercise: "Dumbbell Romanian Deadlifts", sets: "3", reps: "10-12" },
        ],
        "Upper Body": [
          { exercise: "Push-ups", sets: "3-4", reps: "8-12" },
          { exercise: "Dumbbell Rows", sets: "3", reps: "10-12 per arm" },
          { exercise: "Dumbbell Shoulder Press", sets: "3", reps: "8-12" },
          { exercise: "Dumbbell Flyes", sets: "3", reps: "12-15" },
          { exercise: "Tricep Dips", sets: "3", reps: "10-15" },
        ],
        "Lower Body": [
          { exercise: "Goblet Squats", sets: "4", reps: "10-12" },
          { exercise: "Dumbbell Romanian Deadlifts", sets: "3", reps: "10-12" },
          { exercise: "Walking Lunges", sets: "3", reps: "10 per leg" },
          { exercise: "Glute Bridges", sets: "3", reps: "15-20" },
          { exercise: "Calf Raises", sets: "3", reps: "15-20" },
        ],
      }
    }

    // Resources based on fitness level
    if (data.fitnessLevel === "Beginner (0-6 months)") {
      plan.resources = [
        "Proper Form Guide for Beginners",
        "Nutrition Basics for Body Recomposition",
        "Recovery Strategies for New Lifters",
        "Progressive Overload: A Beginner's Guide",
      ]
    } else if (data.fitnessLevel === "Intermediate (6-18 months)") {
      plan.resources = [
        "Intermediate Programming Principles",
        "Breaking Through Plateaus",
        "Periodization for Continued Progress",
        "Nutrient Timing for Optimal Results",
      ]
    } else if (data.fitnessLevel === "Advanced (18+ months)") {
      plan.resources = [
        "Advanced Training Techniques",
        "Optimizing Recovery for High-Volume Training",
        "Micronutrient Considerations for Athletes",
        "Specialized Training Protocols",
      ]
    } else {
      plan.resources = [
        "Fundamentals of Strength Training",
        "Nutrition Guide for Body Recomposition",
        "Recovery and Sleep Optimization",
        "Tracking Progress Effectively",
      ]
    }

    setWorkoutPlan(plan)
  }

  // Handle retaking the quiz
  const handleRetakeQuiz = () => {
    router.push("/quiz")
  }

  // Add the download functionality to the workout plan page
  const handleDownloadPlan = () => {
    if (!isClient) return

    try {
      // Create content for the download
      let content = "YOUR PERSONALIZED WORKOUT PLAN\n\n"

      // Add user data
      if (quizData) {
        content += "PLAN DETAILS:\n"
        content += `Equipment Access: ${quizData.equipmentAccess || "Not specified"}\n`
        content += `Fitness Level: ${quizData.fitnessLevel || "Not specified"}\n`
        content += `Training Environment: ${quizData.trainingEnvironment || "Not specified"}\n`
        content += `Training Days: ${quizData.trainingDays || "Not specified"}\n`
        if (quizData.gender) content += `Gender: ${quizData.gender}\n`
        if (quizData.weight) content += `Weight: ${quizData.weight} kg\n`
        if (quizData.height) content += `Height: ${quizData.height} cm\n`
        if (quizData.age) content += `Age: ${quizData.age}\n`
        content += "\n"
      }

      // Add equipment needed
      content += "EQUIPMENT NEEDED:\n"
      content += `${workoutPlan.equipmentNeeded}\n\n`

      // Add weekly split
      content += "WEEKLY SPLIT:\n"
      const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
      workoutPlan.weeklySplit.forEach((workout, index) => {
        content += `${days[index]}: ${workout}\n`
      })
      content += "\n"

      // Add day-wise routine
      content += "WORKOUT ROUTINES:\n"
      Object.keys(workoutPlan.dayWiseRoutine).forEach((day) => {
        content += `\n${day}:\n`
        workoutPlan.dayWiseRoutine[day].forEach((exercise) => {
          content += `- ${exercise.exercise}: ${exercise.sets} sets of ${exercise.reps}\n`
        })
      })
      content += "\n"

      // Add resources
      content += "RECOMMENDED RESOURCES:\n"
      workoutPlan.resources.forEach((resource) => {
        content += `- ${resource}\n`
      })
      content += "\n"

      // Add fitness resources
      content += "ONLINE FITNESS RESOURCES:\n"
      content += "- MuscleWiki: Interactive muscle map and exercise library\n"
      content += "- Muscle & Strength: Comprehensive database of workout routines\n"
      content += "- Darebee: Free fitness resources and visual guides\n"
      content += "- Fitness Blender: High-quality workout videos\n"

      // Create a blob and download
      const blob = new Blob([content], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "workout-plan.txt"
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error downloading workout plan:", error)
      alert("There was an error downloading your workout plan. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-lime-200 p-4">
      <div className="max-w-6xl mx-auto bg-white p-4 rounded-lg">
        <div className="bg-blue-200 rounded-full p-3 mb-4">
          <h1 className="text-center text-3xl font-extrabold">Your Personalized Workout Plan</h1>
        </div>

        <div className="flex justify-between mb-4">
          <Link
            href="/"
            className="bg-pink-400 text-black px-5 py-2 rounded-full hover:bg-pink-500 transition-colors font-bold text-lg shadow-md"
          >
            Home
          </Link>
          <Link
            href="/diet-plan"
            className="bg-yellow-300 text-black px-5 py-2 rounded-full hover:bg-yellow-400 transition-colors font-bold text-lg"
          >
            Diet plan
          </Link>
        </div>

        {quizData && (
          <div className="bg-blue-50 p-3 rounded-lg mb-4">
            <h2 className="font-bold text-xl mb-2">Your Personalized Recomposition Plan Based On:</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              <div>
                <span className="font-bold">Equipment:</span> {quizData.equipmentAccess || "Not specified"}
              </div>
              <div>
                <span className="font-bold">Fitness Level:</span> {quizData.fitnessLevel || "Not specified"}
              </div>
              <div>
                <span className="font-bold">Environment:</span> {quizData.trainingEnvironment || "Not specified"}
              </div>
              <div>
                <span className="font-bold">Training Days:</span> {quizData.trainingDays || "Not specified"}
              </div>
              <div>
                <span className="font-bold">Diet:</span> {quizData.dietaryPreferences || "Not specified"}
              </div>
              {quizData.age && (
                <div>
                  <span className="font-bold">Age:</span> {quizData.age}
                </div>
              )}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
          {/* First column - Equipment & Weekly Split */}
          <div className="bg-yellow-300 p-3 rounded-lg">
            <h2 className="font-bold text-xl mb-2">Equipment & Weekly Split</h2>
            <div className="mb-3">
              <h3 className="font-bold">Equipment:</h3>
              <p className="text-sm">{workoutPlan.equipmentNeeded}</p>
            </div>

            <div>
              <h3 className="font-bold mb-1">Weekly Split:</h3>
              <div className="grid grid-cols-7 gap-1 text-center">
                {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
                  <div key={day + index} className="text-xs font-bold">
                    {day}
                  </div>
                ))}
                {workoutPlan.weeklySplit.map((workout, index) => (
                  <div
                    key={index}
                    className={`text-xs p-1 rounded ${workout.includes("Rest") ? "bg-blue-100" : "bg-green-100"}`}
                  >
                    {workout}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-3">
              <h3 className="font-bold mb-1">Internet Resources:</h3>
              <ul className="list-disc pl-4 text-sm">
                {workoutPlan.resources.map((resource, index) => (
                  <li key={index}>{resource}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Second column - Day-wise Routine */}
          <div className="bg-pink-200 p-3 rounded-lg">
            <h2 className="font-bold text-xl mb-2">Day-wise Routine</h2>
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
              {Object.keys(workoutPlan.dayWiseRoutine).map((day) => (
                <div key={day} className="mb-2">
                  <h3 className="font-bold border-b border-pink-300 pb-1 mb-1">{day}</h3>
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="text-left">
                        <th className="pb-1">Exercise</th>
                        <th className="pb-1 w-12">Sets</th>
                        <th className="pb-1 w-16">Reps</th>
                      </tr>
                    </thead>
                    <tbody>
                      {workoutPlan.dayWiseRoutine[day].map((exercise, i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-pink-100" : ""}>
                          <td className="py-1">{exercise.exercise}</td>
                          <td className="py-1">{exercise.sets}</td>
                          <td className="py-1">{exercise.reps}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </div>

          {/* Third column - Hypertrophy Infographic */}
          <div className="bg-blue-200 rounded-lg flex items-center justify-center overflow-hidden">
            {imagesLoaded.hypertrophyInfographic ? (
              <img
                src="https://www.scienceforsport.com/wp-content/uploads/2022/04/Hypertrophy-1030x1030.png"
                alt="Muscle Hypertrophy Infographic"
                className="w-full h-auto"
                onError={() => handleImageError("hypertrophyInfographic")}
              />
            ) : (
              <div className="w-full aspect-square bg-blue-100 flex items-center justify-center p-4 text-center">
                <div>
                  <h3 className="font-bold mb-2">Muscle Hypertrophy Principles</h3>
                  <ul className="text-left list-disc pl-5">
                    <li>Progressive Overload</li>
                    <li>Adequate Volume</li>
                    <li>Proper Nutrition</li>
                    <li>Sufficient Recovery</li>
                    <li>Consistent Training</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Pro Tip and Youth Exercise Infographic */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
          {/* Resource Links */}
          <div className="bg-white p-3 rounded-lg border border-gray-200">
            <h3 className="font-bold mb-2">Recommended Fitness Resources:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <a
                href="https://musclewiki.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <h4 className="font-bold text-blue-600">MuscleWiki</h4>
                <p className="text-sm">Interactive muscle map and exercise library with proper form demonstrations</p>
              </a>

              <a
                href="https://www.muscleandstrength.com/workout-routines"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <h4 className="font-bold text-blue-600">Muscle & Strength</h4>
                <p className="text-sm">Comprehensive database of workout routines for all experience levels</p>
              </a>

              <a
                href="https://darebee.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <h4 className="font-bold text-blue-600">Darebee</h4>
                <p className="text-sm">Free fitness resources, workouts, and programs with visual guides</p>
              </a>

              <a
                href="https://www.fitnessblender.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <h4 className="font-bold text-blue-600">Fitness Blender</h4>
                <p className="text-sm">High-quality workout videos and customizable training programs</p>
              </a>
            </div>
          </div>

          <div className="md:col-span-2 bg-blue-200 rounded-lg flex items-center justify-center overflow-hidden">
            {imagesLoaded.youthExerciseInfographic ? (
              <img
                src="https://athleticlab.com/wp-content/uploads/2018/11/Youth-Exercise-Infographic.jpg"
                alt="Youth Exercise Infographic"
                className="w-full h-auto"
                onError={() => handleImageError("youthExerciseInfographic")}
              />
            ) : (
              <div className="w-full aspect-[2/1] bg-blue-100 flex items-center justify-center p-4 text-center">
                <div>
                  <h3 className="font-bold mb-2">Youth Exercise Guidelines</h3>
                  <ul className="text-left list-disc pl-5">
                    <li>Focus on proper form before adding weight</li>
                    <li>Include variety of activities for balanced development</li>
                    <li>Ensure adequate recovery between training sessions</li>
                    <li>Prioritize bodyweight mastery before heavy resistance</li>
                    <li>Make fitness fun and sustainable</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-3 mt-3">
          <button
            onClick={handleDownloadPlan}
            className="bg-blue-400 text-black px-6 py-2 rounded-full text-center hover:bg-blue-500 transition-colors font-bold text-lg shadow-md w-full md:w-1/3"
          >
            Download Plan
          </button>
          <button
            onClick={handleRetakeQuiz}
            className="bg-pink-400 text-black px-6 py-2 rounded-full text-center hover:bg-pink-500 transition-colors font-bold text-lg shadow-md w-full md:w-1/3"
          >
            Retake the quiz
          </button>
        </div>
      </div>
    </div>
  )
}

