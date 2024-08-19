import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setRole } from './auth/auth';
import { addCourse, deleteCourse, editCourse } from './courses/courses';

function App() {
  const [newCourse, setNewCourse] = useState({ title: '', description: '' });
  const [editMode, setEditMode] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);

  const role = useSelector(state => state.auth.role);
  const courses = useSelector(state => state.courses.courses);
  const dispatch = useDispatch();

  const handleRoleChange = (e) => {
    dispatch(setRole(e.target.value));
  };

  const handleAddCourse = () => {
    if (newCourse.title && newCourse.description) {
      dispatch(addCourse(newCourse));
      setNewCourse({ title: '', description: '' });
    }
  };

  const handleEditCourse = (course) => {
    setEditMode(true);
    setCurrentCourse(course);
    setNewCourse({ title: course.title, description: course.description });
  };

  const handleUpdateCourse = () => {
    dispatch(editCourse({ id: currentCourse.id, ...newCourse }));
    setEditMode(false);
    setCurrentCourse(null);
    setNewCourse({ title: '', description: '' });
  };

  const handleDeleteCourse = (id) => {
    dispatch(deleteCourse(id));
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold underline mb-4 text-center">Course Management</h1>
      <div className="mb-4">
        <label>Choose Role: </label>
        <select value={role} onChange={handleRoleChange} className="border p-2">
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {role === 'admin' && (
        <div className="mb-4">
          <input
            type="text"
            value={newCourse.title}
            onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
            placeholder="Course Title"
            className="w-full p-2 border mb-2"
          />
          <textarea
            value={newCourse.description}
            onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
            placeholder="Course Description"
            className="w-full p-2 border mb-2"
          />
          <button
            onClick={editMode ? handleUpdateCourse : handleAddCourse}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            {editMode ? 'Update Course' : 'Add Course'}
          </button>
        </div>
      )}

      <ul>
        {courses.map(course => (
          <li key={course.id} className="flex justify-between items-center p-4 mb-2 border rounded-lg bg-white shadow-md">
            <div>
              <h2 className="text-xl font-bold">{course.title}</h2>
              <p>{course.description}</p>
            </div>
            {role === 'admin' && (
              <div>
                <button
                  onClick={() => handleEditCourse(course)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteCourse(course.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
