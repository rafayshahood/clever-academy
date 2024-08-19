import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setRole } from './auth/auth';
import { addCourse, deleteCourse, editCourse } from './courses/courses';
import { Button, Input, Select, Card, List, Typography, Space } from 'antd';

const { TextArea } = Input;
const { Title, Text } = Typography;
const { Option } = Select;

function App() {
  const [newCourse, setNewCourse] = useState({ title: '', description: '' });
  const [editMode, setEditMode] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);

  const role = useSelector(state => state.auth.role);
  const courses = useSelector(state => state.courses.courses);
  const dispatch = useDispatch();

  const handleRoleChange = (value) => {
    dispatch(setRole(value));
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
      <Title className="text-center" level={2}>Course Management</Title>
      <div className="mb-4">
        <Select
          value={role}
          onChange={handleRoleChange}
          style={{ width: 200 }}
          placeholder="Select Role"
        >
          <Option value="user">User</Option>
          <Option value="admin">Admin</Option>
        </Select>
      </div>

      {role === 'admin' && (
        <Card title={editMode ? 'Edit Course' : 'Add New Course'} className="mb-4">
          <Input
            value={newCourse.title}
            onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
            placeholder="Course Title"
            className="mb-2"
          />
          <TextArea
            value={newCourse.description}
            onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
            placeholder="Course Description"
            rows={4}
            className="mb-2"
          />
          <Button
            type="primary"
            onClick={editMode ? handleUpdateCourse : handleAddCourse}
            block
          >
            {editMode ? 'Update Course' : 'Add Course'}
          </Button>
        </Card>
      )}

      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={courses}
        renderItem={course => (
          <List.Item>
            <Card
              title={course.title}
              actions={
                role === 'admin' ? [
                  <Button type="link" onClick={() => handleEditCourse(course)}>Edit</Button>,
                  <Button type="link" danger onClick={() => handleDeleteCourse(course.id)}>Delete</Button>
                ] : []
              }
            >
              <Text>{course.description}</Text>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
}

export default App;
