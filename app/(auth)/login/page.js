export async function generateMetadata() { // to dynamically generate metadata
    return {
        title: 'Login',
        description: 'r-cloud login page',
        alternates: {
            canonical: `/login`
        }
    }
};

export default function Login() {
    return (
        <main>
            <h1>Log In</h1>
        </main>
    )
}
