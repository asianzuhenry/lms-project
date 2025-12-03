
export const getCourses = async (req, res) => {
    // Placeholder function to get courses
    // Actual implementation will depend on the Course model and user role
    const courses = [{
        id: 1,
        title: "Sample Course",
        description: "This is a sample course description."
    }]; // Fetch courses from database
    res.json(courses);
}