const getCourses = () => {
  return fetch("http://localhost:2223/api/cursos");
};

const courses = document.querySelector(".cursos");

const renderCourse = (arr) => {
  console.log(arr);
  const items = arr
    .map((item) => {
      return `<div class="curso">
        <h3>${item.name}</h3>
        <p class="duration">${item.duration}</p>
        <p class="description">${item.description}</p>
      </div>`;
    })
    .join("");
  console.log(items);

  courses.innerHTML = items;
};

getCourses()
  .then((data) => data.json())
  .then((json) => renderCourse(json.courses))
  .finally(() => console.log("Fetch done!"))
  .catch((error) => console.error(error));
