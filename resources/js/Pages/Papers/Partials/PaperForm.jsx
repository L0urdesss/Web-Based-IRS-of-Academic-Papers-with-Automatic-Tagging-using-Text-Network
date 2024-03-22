import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import SelectInput from "@/Components/SelectInput.jsx";

export default function PaperForm({ paper, className = '' }) {
    const { data, setData, patch,post, errors, processing, recentlySuccessful } = useForm({
        title: paper ? paper.title : "",
        abstract: paper ? paper.abstract : "",
        author: paper ? paper.author : "", 
        date_published: paper ? paper.date_published : "",
        file: paper ? paper.file : "",
    });

    const submit = (e) => {
        e.preventDefault();
    
        if (paper) {
            patch(route('papers.update', paper.id), {
                preserveScroll: true
            });
        } else {
            post(route('papers.store'), {
                preserveScroll: true
            });
        }
    };
    


    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Order Information</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="title" value="Title" />

                    <TextInput
                        id="title"
                        className="mt-1 block w-full"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                    />
                </div>

                <div>
                    <InputLabel htmlFor="abstract" value="Abstract" />

                    <TextInput 
                    type="textarea" 
                    className="mt-1 block w-full h-auto min-h-20 p-2 border border-gray-300 rounded-md resize-y" 
                    value={data.abstract} 
                    onChange={(e) => setData({ ...data, abstract: e.target.value })} />

                </div>

                <div>
                    <InputLabel htmlFor="author" value="Author" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.author}
                        onChange={(e) => setData('author', e.target.value)}

                    />
                </div>

                <div>
                    <InputLabel htmlFor="date_published" value="Date Published" />

                    <TextInput
                        id="date_published"
                        className="mt-1 block w-full"
                        value={data.date_published}
                        onChange={(e) => setData('date_published', e.target.value)}

                    />

                    <InputError className="mt-2" message={errors.date_published} />
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

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save Changes</PrimaryButton>

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
    );
}