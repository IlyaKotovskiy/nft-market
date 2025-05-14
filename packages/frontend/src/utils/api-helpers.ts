export async function handleRequest<T>(request: Promise<T>): Promise<T> {
    return request.catch(error => {
        console.error('Response error:', error.response);
        throw error;
    });
};