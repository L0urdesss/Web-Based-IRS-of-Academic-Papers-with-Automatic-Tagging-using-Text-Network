import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import {useForm } from '@inertiajs/react';


export default function PaperDetails({ paper, className = '' }) {
    const { data, setData} = useForm({
        title: paper ? paper.title : "",
        abstract: paper ? paper.abstract : "",
        author: paper ? paper.author : "", 
        date_published: paper ? paper.date_published : "",
        file: paper ? paper.file : "",
    });



    return (
        <section className={className}>
            <header>
                <p className="mt-1 text-sm text-gray-600">
                </p>
            </header>

                <div>
                    <InputLabel htmlFor="title" value="Title" />

                    <TextInput
                        id="title"
                        className="mt-1 block w-full"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        disabled
                    />
                </div>

                <div>
                    <InputLabel htmlFor="abstract" value="Abstract" />

                    <TextInput 
                    type="textarea" 
                    className="mt-1 block w-full h-auto min-h-20 p-2 border border-gray-300 rounded-md resize-y" 
                    value={data.abstract} 
                    onChange={(e) => setData({ ...data, abstract: e.target.value })} 
                    disabled
                    />
                    
                </div>

                <div>
                    <InputLabel htmlFor="author" value="Author" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.author}
                        onChange={(e) => setData('author', e.target.value)}
                        disabled
                    />
                </div>

                <div>
                    <InputLabel htmlFor="date_published" value="Date Published" />

                    <TextInput
                        id="date_published"
                        className="mt-1 block w-full"
                        value={data.date_published}
                        onChange={(e) => setData('date_published', e.target.value)}
                        disabled
                    />

                </div>

                <div>
                    <InputLabel htmlFor="file" value="File" />

                    <TextInput
                        id="file"
                        className="mt-1 block w-full"
                        value={data.file}
                        //onChange={(e) => setData('file', e.target.value)}
                        disabled
                    />
                </div>
        </section>
    );
}