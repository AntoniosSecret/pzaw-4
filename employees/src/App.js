import React, { useState, useEffect } from 'react';

function App() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filterText, setFilterText] = useState('');

  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')
  
  const [activeSort, setActiveSort] = useState({ by: 'name', order: 'asc' });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8000/employees');
      if (!response.ok) {
        throw new Error('Błąd podczas pobierania danych');
      }
      const data = await response.json();
      setEmployees(data.employees);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Czy na pewno chcesz usunąć tego pracownika?')) {
      try {
        const response = await fetch(`http://localhost:8000/employee/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Błąd podczas usuwania pracownika');
        }

        setEmployees(employees.filter(emp => emp.id !== id));
      } catch (err) {
        alert(`Nie udało się usunąć: ${err.message}`);
      }
    }
  };

  const handleSortSubmit = (e) => {
    e.preventDefault();
    setActiveSort({ by: sortBy, order: sortOrder });
  };

  const filteredEmployees = employees.filter(emp => {
    if (!emp.position) return false;
    return emp.position.toLowerCase().includes(filterText.toLowerCase());
  });

  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    let valueA, valueB;

    if (activeSort.by === 'name') {
      valueA = a.name.toLowerCase();
      valueB = b.name.toLowerCase();
    } else if (activeSort.by === 'salary') {
      valueA = Number(a.salary);
      valueB = Number(b.salary);
    } else if (activeSort.by === 'age') {
      valueA = Number(a.age);
      valueB = Number(b.age);
    }

    if (valueA < valueB) return activeSort.order === 'asc' ? -1 : 1;
    if (valueA > valueB) return activeSort.order === 'asc' ? 1 : -1;
    return 0;
  });

  if (loading) return <div className="container mt-5 text-center"><h3>Ładowanie danych...</h3></div>;
  if (error) return <div className="container mt-5 alert alert-danger">Błąd: {error}</div>;

  return (
    <div className="container" style={{ marginTop: "20px" }}>
        <div className="row g-3 align-items-end">
          <div>
            <form onSubmit={handleSortSubmit} className="row g-3 align-items-end">
              <div className="col-sm-5">
                <select
                  id="sortBySelect"
                  className="form-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="name">Imię</option>
                  <option value="salary">Pensja</option>
                  <option value="age">Wiek</option>
                </select>
              </div>

              <div className="col-sm-4">
                <select
                  id="sortOrderSelect"
                  className="form-select"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="asc">Rosnąco</option>
                  <option value="desc">Malejąco</option>
                </select>
              </div>

              <div className="col-sm-3">
                <button type="submit" className="btn btn-primary w-100">Sortuj!</button>
              </div>
            </form>
          </div>
          <div>
            <input
              id="filterInput"
              type="text"
              className="form-control"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
          </div>
          
          

        </div>
        <hr/>

        <table className="table table-striped">
          <thead className="table-light">
            <tr>
              <th scope="col">Lp.</th>
              <th scope="col">Imię</th>
              <th scope="col">Stanowisko</th>
              <th scope="col">Dział</th>
              <th scope="col">Email</th>
              <th scope="col">Pensja</th>
              <th scope="col">Wiek</th>
              <th scope="col">Kraj</th>
              <th scope="col" className="text-center">Akcja</th>
            </tr>
          </thead>
          <tbody>
            {sortedEmployees.length > 0 ? (
              sortedEmployees.map((employee, index) => (
                <tr key={employee.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{employee.name}</td>
                  <td>{employee.position}</td>
                  <td>{employee.department}</td>
                  <td>{employee.email}</td>
                  <td>{Number(employee.salary).toLocaleString('pl-PL')} zł</td>
                  <td>{employee.age}</td>
                  <td>{employee.country}</td>
                  <td className="text-center">
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(employee.id)}
                    >
                      Usuń
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>
                  Brak pracowników spełniających kryteria wyszukiwania.
                </td>
              </tr>
            )}
          </tbody>
        </table>
    </div>
  );
}

export default App;