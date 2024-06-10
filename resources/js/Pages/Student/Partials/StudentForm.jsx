import React, { useState, useEffect } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

// Import the images using @/ alias
import uploadBoxImage from '@/Components/uploadbox.png'; // Import the upload box image
import browseButtonImage from '@/Components/browse_button.png'; // Import the browse button image
import CourseDropdown from '@/Components/CourseDropdown';

export default function StudentForm({ auth, student, className = '' }) {
    const { data, setData, patch, post, errors, processing, recentlySuccessful } = useForm({
        email: student ? student.email : "",
        name: student ? student.name : "",
        course: student ? student.course : "", 
        college: student ? student.college : "",
    });

    const handleCourseChange = (e) => {
        setSelectedCourse(e.target.value);
    };

    const [selectedCourse, setSelectedCourse] = useState(student ? student.course : 'BASLT'); // Set initial value to student.course
    useEffect(() => {   
        setData('course', selectedCourse);
    }, [selectedCourse]);

    const submit = async (e) => {
        e.preventDefault();
        
        if (student) {
            patch(route('student.update', student.id), {
                preserveScroll: true
            });
        } else {
            console.log("submitted")
            post(route('student.store'), {
                preserveScroll: true
            });
        }
    };

    return (
        <div className="relative flex flex-col md:flex-row justify-between mx-4 md:mx-20 space-y-4 md:space-y-0 md:space-x-10">
            <section className={`bg-white p-4 md:p-10 ${className}`} style={{ width: "100%" }}>
                <header>
                    <h2 className="text-lg font-medium text-gray-900" style={{ fontSize: '20px', fontWeight:'bolder' }}>Student Information</h2>
                    <p className="mt-1 text-sm text-gray-600" style={{ fontSize: '10px', }}>Update Student Information here!</p>
                </header>
                <form onSubmit={submit} className="mt-6 space-y-6">
                    <div>
                        <InputLabel htmlFor="email" value="Email" style={{ fontSize: '12px' }} />
                        <TextInput
                            id="email"
                            className="mt-1 block w-full"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            style={{ fontSize: '10px', border: '1px solid #7B7B7B' }} // Added border rule
                        />
                        <InputError className="mt-2" message={errors.email} />
                    </div>
                    <div>
                        <InputLabel htmlFor="name" value="Name" style={{ fontSize: '12px' }} />
                        <TextInput
                            id="name"
                            className="mt-1 block w-full"
                            value={data.name}
                            onChange={(e) => setData({ ...data, name: e.target.value })}
                            style={{ fontSize: '10px', border: '1px solid #7B7B7B' }} // Added border rule
                        />
                        <InputError className="mt-2" message={errors.name} />
                    </div>
                    <div>
                        <h1>Course Selection</h1>
                        <CourseDropdown onChange={handleCourseChange} value={data.course} />
                    </div>

                    <div>
                        <InputLabel htmlFor="college" value="College" style={{ fontSize: '12px' }} />
                        <TextInput
                            id="college"
                            className="mt-1 block w-full"
                            value={data.college}
                            onChange={(e) => setData({ ...data, college: e.target.value })}
                            style={{ fontSize: '10px', border: '1px solid #7B7B7B' }} // Added border rule
                        />
                        <InputError className="mt-2" message={errors.college} />
                    </div>
                    <div className="flex items-center justify-end gap-4">
                        <PrimaryButton style={{ backgroundColor: '#831B1C', fontSize: '10px', textTransform: 'capitalize' }} disabled={processing}>Save Changes</PrimaryButton>
                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-gray-600">Saved.</p>
                        </Transition>
                    </div>
                </form>
            </section>

        </div>
    );
}
