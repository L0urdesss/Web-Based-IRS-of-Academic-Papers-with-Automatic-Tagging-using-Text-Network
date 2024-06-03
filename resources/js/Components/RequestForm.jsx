import React from 'react';
import exitButtonImg from '@/Components/x_button.png';
import logoImg from '@/Components/logo2.png';

const RequestForm = ({ user, data, setData, submit, handleCloseForm }) => {
    // Determine whether the user is an admin
    const isAdmin = user.role === 'admin';
    const handleSubmit = (e, action) => {
        e.preventDefault();
        submit(action);
    };
    console.log("in requestform: ",data)

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center" style={{ backdropFilter: 'blur(2px)' }}>
            <div className="bg-white rounded-md relative" style={{ width: '350px', minHeight: '300px', maxHeight: '80vh', overflowY: 'auto', borderRadius: '10px' }}>
                <button className="absolute right-0 top-0 p-2" onClick={handleCloseForm}>
                    <img src={exitButtonImg} alt="Exit Button" className="h-3 w-3" />
                </button>
                <div style={{ backgroundColor: '#831B1C', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '35px' }}>
                    <img src={logoImg} alt="Logo" className="block" style={{ width: 'auto', height: '200%' }} />
                </div>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="p-5">
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', fontSize: '16px', color: '#831B1C', fontWeight: 'bold' }}>
                            Submit Your Request Here!
                        </div>
                        <div style={{ fontSize: '10px', lineHeight: '1.4', color: '#831B1C', marginBottom: '15px' }}>
                            Fill out this form to send us your request. It's the fastest and easiest way to get in touch!
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '10px', fontSize: '10px' }}>
                            <label htmlFor="fullname" style={{ marginRight: '5px', width: '50px', textAlign: 'left', fontWeight: 'bold' }}>Name:</label>
                            <input type="text" id="fullname" value={data.user.student.name} disabled className="rounded-md border-none bg-gray-200 p-1" style={{ width: 'calc(100% - 60px)', fontSize: '10px', borderRadius: '3px', }} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '10px', fontSize: '10px' }}>
                            <label htmlFor="email" style={{ marginRight: '5px', width: '50px', textAlign: 'left', fontWeight: 'bold' }}>Email:</label>
                            <input type="email" id="email" value={data.user.email} disabled className="rounded-md border-none bg-gray-200 p-1" style={{ width: 'calc(100% - 60px)', fontSize: '10px', borderRadius: '3px' }} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '10px', fontSize: '10px' }}>
                            <label htmlFor="course" style={{ marginRight: '5px', width: '50px', textAlign: 'left', fontWeight: 'bold' }}>Course:</label>
                            <input type="text" id="course" value={data.user.student.course} onChange={(e) => setData('course', e.target.value)} className="rounded-md border-none bg-gray-200 p-1" style={{ width: 'calc(100% - 60px)', fontSize: '10px', borderRadius: '3px' }} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '10px', fontSize: '10px' }}>
                            <label htmlFor="title" style={{ marginRight: '5px', width: '50px', textAlign: 'left' ,fontWeight: 'bold'}}>Title:</label>
                            <input type="text" id="title" value={data.paper.title} disabled className="rounded-md border-none bg-gray-200 p-1" style={{ width: 'calc(100% - 60px)', fontSize: '10px', borderRadius: '3px' }} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '1px' }}>
                            <label htmlFor="purpose" style={{ fontSize: '14px' }}></label>
                            <textarea
                                id="purpose"
                                value={data.purpose}
                                onChange={(e) => setData('purpose', e.target.value)}
                                className="rounded-md border-none bg-gray-200 p-1 mt-1"
                                style={{ height: '100px', width: '100%', resize: 'none', fontSize: '10px', borderRadius: '3px' }}
                                placeholder="Describe Your Purpose here.."
                                onFocus={(e) => e.target.placeholder = ''}
                                onBlur={(e) => e.target.placeholder = 'Describe Your Purpose here..'}
                            />
                        </div>
                    </div>
                    {/* Render submit button only if user is not an admin */}
                    {isAdmin && (
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <button
                                type="submit"
                                onClick={(e) => handleSubmit(e, 'reject')}
                                style={{
                                    backgroundColor: '#831B1C', // Red color for reject
                                    color: 'white',
                                    borderRadius: '5px',
                                    padding: '5px 5px',
                                    fontSize: '12px',
                                    fontWeight: 'bold',
                                    width: '40%',
                                    marginLeft: 'auto',
                                    marginRight: '6px',
                                    marginBottom: '6px',
                                }}
                            >
                                Reject
                            </button>
                            <button
                                type="submit"
                                onClick={(e) => handleSubmit(e, 'approve')}
                                style={{
                                    backgroundColor: '#3C6441', // Green color for approve
                                    color: 'white',
                                    borderRadius: '5px',
                                    padding: '5px 5px',
                                    fontSize: '12px',
                                    fontWeight: 'bold',
                                    width: '40%',
                                    marginLeft: '6px',
                                    marginRight: 'auto',
                                    marginBottom: '6px',
                                }}
                            >
                                Approve
                            </button>
                        </div>
                    )}

                    {!isAdmin && (
                        <button
                            type="submit"
                            onClick={(e) => handleSubmit(e, 'upload')}
                            style={{
                                backgroundColor: '#831B1C',
                                color: 'white',
                                borderRadius: '5px',
                                padding: '5px 5px',
                                fontSize: '12px',
                                marginTop: '5px',
                                width: '80%',
                                position: 'relative',
                                bottom: '20px',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                display: 'block',
                                fontWeight: 'bold',
                            }}
                        >
                            Submit Form
                        </button>
                    )}

                </form>
            </div>
        </div>
    );
};

export default RequestForm;
