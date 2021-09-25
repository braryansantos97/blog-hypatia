import React, { useState, useEffect, useRef } from 'react';

export default function Show(props) {
	const [blog, setBlog] = useState({});
	const titleInput = useRef(null); //same as document.querySelector('input#title')
	const bodyInput = useRef(null); //same as document.querySelector('input#body')

	const handleUpdate = async e => {
		e.preventDefault();
		try {
			const response = await fetch(`/api/blogs/${props.match.params.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					title: titleInput.current.value,
					body: bodyInput.current.value
				})
			});
			const data = await response.json();
			setBlog(data);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch(`/api/blogs/${props.match.params.id}`);
				const data = await response.json();
				setBlog(data);
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);
	const handleDelete = async e => {
		try {
			const response = await fetch(`/api/blogs/${props.match.params.id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const deletedBlog = await response.json();
		} catch (error) {
			console.error(error);
		} finally {
			window.location.assign('/');
		}
	};
	return (
		<div className="ShowPage">
			{Object.keys(blog).length ? (
				<>
					<h3>{blog.title}</h3>
					<p>{blog.body}</p>
					<button onClick={handleDelete}>DELETE ME</button>
				</>
			) : (
				<h1> Loading...</h1>
			)}
			<form
				style={{ display: 'flex', flexDirection: 'column' }}
				onSubmit={handleUpdate}
			>
				<label>
					{' '}
					Title:{' '}
					<input type="text" ref={titleInput} defaultValue={blog.title} />
				</label>
				<label>
					{' '}
					Body: <input type="text" ref={bodyInput} defaultValue={blog.body} />
				</label>
				<input type="submit" value="Update MicroBlog" />
			</form>
		</div>
	);
}
