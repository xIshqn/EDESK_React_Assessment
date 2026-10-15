import { useMemo, useState } from "react";
import { EyeIcon, PencilIcon, TrashIcon } from "./Icons.jsx";

const PAGE_SIZE = 5;

const COLUMNS = [
  { key: "name", label: "Name", sortable: true },
  { key: "address", label: "Address" },
  { key: "city", label: "City", sortable: true },
  { key: "pinCode", label: "Pin Code" },
  { key: "country", label: "Country", sortable: true },
];

export default function CustomerTable({ data, scopeLabel }) {
  const [sort, setSort] = useState({ key: null, dir: "asc" });
  const [page, setPage] = useState(1);

  const sorted = useMemo(() => {
    if (!sort.key) return data;
    const factor = sort.dir === "asc" ? 1 : -1;
    return [...data].sort(
      (a, b) => String(a[sort.key]).localeCompare(String(b[sort.key])) * factor,
    );
  }, [data, sort]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const rows = sorted.slice(start, start + PAGE_SIZE);

  const toggleSort = (key) => {
    setSort((prev) =>
      prev.key === key
        ? { key, dir: prev.dir === "asc" ? "desc" : "asc" }
        : { key, dir: "asc" },
    );
    setPage(1);
  };

  const handleView = (row) => {
    console.log("View customer:", row);
    alert(
      `Customer Details\n\n` +
        `ID: ${row.id}\n` +
        `Name: ${row.name}\n` +
        `Address: ${row.address}\n` +
        `City: ${row.city}\n` +
        `State: ${row.state}\n` +
        `Pin Code: ${row.pinCode}\n` +
        `Country: ${row.country}`,
    );
  };

  const handleEdit = (row) => console.log("Edit customer:", row);
  const handleDelete = (row) => console.log("Delete customer:", row);

  const sortIndicator = (key) => {
    if (sort.key !== key) return "⇕";
    return sort.dir === "asc" ? "▲" : "▼";
  };

  return (
    <div className="card">
      <h3 className="card-title">
        Customer <strong>Details</strong>
        {scopeLabel && <span className="scope"> · {scopeLabel}</span>}
      </h3>

      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>#</th>
              {COLUMNS.map((col) => (
                <th key={col.key}>
                  {col.sortable ? (
                    <button
                      type="button"
                      className="sort-btn"
                      onClick={() => toggleSort(col.key)}
                    >
                      {col.label}{" "}
                      <span className="sort-icon">
                        {sortIndicator(col.key)}
                      </span>
                    </button>
                  ) : (
                    col.label
                  )}
                </th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={COLUMNS.length + 2} className="empty">
                  No customers found for this location.
                </td>
              </tr>
            ) : (
              rows.map((row, i) => (
                <tr key={row.id}>
                  <td>{start + i + 1}</td>
                  {COLUMNS.map((col) => (
                    <td key={col.key}>{row[col.key]}</td>
                  ))}
                  <td className="actions">
                    <button
                      type="button"
                      className="icon-btn view"
                      title="View"
                      aria-label={`View ${row.name}`}
                      onClick={() => handleView(row)}
                    >
                      <EyeIcon />
                    </button>
                    <button
                      type="button"
                      className="icon-btn edit"
                      title="Edit"
                      aria-label={`Edit ${row.name}`}
                      onClick={() => handleEdit(row)}
                    >
                      <PencilIcon />
                    </button>
                    <button
                      type="button"
                      className="icon-btn delete"
                      title="Delete"
                      aria-label={`Delete ${row.name}`}
                      onClick={() => handleDelete(row)}
                    >
                      <TrashIcon />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        <span className="muted">
          Showing <strong>{rows.length}</strong> out of{" "}
          <strong>{sorted.length}</strong> entries
        </span>
        <div className="pagination">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setPage(currentPage - 1)}
            aria-label="Previous page"
          >
            ‹
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              className={n === currentPage ? "active" : ""}
              onClick={() => setPage(n)}
            >
              {n}
            </button>
          ))}
          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setPage(currentPage + 1)}
            aria-label="Next page"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
