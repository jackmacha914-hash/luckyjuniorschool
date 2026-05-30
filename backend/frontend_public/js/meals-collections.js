// ------------------ Meals & Collections JS ------------------

document.addEventListener("click", function(e) {
    const mealModal = document.getElementById("mc-meal-modal");
    const otherModal = document.getElementById("mc-other-modal");

    // ---------- OPEN MODALS ----------
    if (e.target.closest("#mc-add-meal-btn")) mealModal?.classList.add("mc-show");
    if (e.target.closest("#mc-add-other-btn")) otherModal?.classList.add("mc-show");

    // ---------- CLOSE MODALS ----------
    if (e.target.closest("#mc-close-meal") || e.target.id === "mc-meal-modal") mealModal?.classList.remove("mc-show");
    if (e.target.closest("#mc-close-other") || e.target.id === "mc-other-modal") otherModal?.classList.remove("mc-show");
});

// ------------------ FETCH & LOAD MEALS ------------------
async function loadMeals() {

    const className =
        document.getElementById("mc-filter-class-meals")?.value || "";

    const mealType =
        document.getElementById("mc-filter-type-meals")?.value || "";

    const date =
        document.getElementById("mc-filter-date-meals")?.value || "";

    const search =
        document.getElementById("mc-search-meals")?.value || "";

    const params = new URLSearchParams();

    if (className) params.append("className", className);
    if (mealType) params.append("mealType", mealType);
    if (date) params.append("date", date);
    if (search) params.append("search", search);

    const url = `/api/meals?${params.toString()}`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        const tbody = document.querySelector("#mc-meals-table tbody");
        tbody.innerHTML = "";

        data.forEach(meal => {

            const row = document.createElement("tr");

            const mealDate =
                meal.date ? meal.date.split("T")[0] : "";

            row.innerHTML = `
                <td>${meal.className || ""}</td>
                <td>${meal.studentName || ""}</td>
                <td>${meal.mealType || ""}</td>
                <td>${mealDate}</td>
                <td>${meal.frequency || ""}</td>
                <td>${meal.amount || 0}</td>
                <td>${meal.receiptNumber || ""}</td>
            `;

            tbody.appendChild(row);
        });

    } catch (err) {
        console.error("Error loading meals:", err);
    }
}

// ------------------ FETCH & LOAD OTHER CHARGES ------------------
async function loadOtherCharges() {

    const className =
        document.getElementById("mc-filter-class-other")?.value || "";

    const chargeType =
        document.getElementById("mc-filter-type-other")?.value || "";

    const date =
        document.getElementById("mc-filter-date-other")?.value || "";

    const search =
        document.getElementById("mc-search-other")?.value || "";

    const params = new URLSearchParams();

    if (className) params.append("className", className);
    if (chargeType) params.append("chargeType", chargeType);
    if (date) params.append("date", date);
    if (search) params.append("search", search);

    const url = `/api/other-charges?${params.toString()}`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        const tbody = document.querySelector("#mc-other-table tbody");
        tbody.innerHTML = "";

        data.forEach(charge => {

            const row = document.createElement("tr");

            const chargeDate =
                charge.date ? charge.date.split("T")[0] : "";

            row.innerHTML = `
                <td>${charge.className || ""}</td>
                <td>${charge.studentName || ""}</td>
                <td>${charge.chargeType || ""}</td>
                <td>${chargeDate}</td>
                <td>${charge.amount || 0}</td>
                <td>${charge.receiptNumber || ""}</td>
            `;

            tbody.appendChild(row);
        });

    } catch (err) {
        console.error("Error loading charges:", err);
    }
}
// ------------------ FILTERS ------------------

// Meals filters
document.getElementById("mc-filter-class-meals")
?.addEventListener("change", applyMealsFilters);

document.getElementById("mc-filter-type-meals")
?.addEventListener("change", applyMealsFilters);

document.getElementById("mc-filter-date-meals")
?.addEventListener("change", applyMealsFilters);

document.getElementById("mc-search-meals")
?.addEventListener("input", applyMealsFilters);


// Other charges filters
document.getElementById("mc-filter-class-other")
?.addEventListener("change", applyOtherFilters);

document.getElementById("mc-filter-type-other")
?.addEventListener("change", applyOtherFilters);

document.getElementById("mc-filter-date-other")
?.addEventListener("change", applyOtherFilters);

document.getElementById("mc-search-other")
?.addEventListener("input", applyOtherFilters);


// ------------------ APPLY MEALS FILTERS ------------------
function applyMealsFilters() {

    const classFilter =
        document.getElementById("mc-filter-class-meals")?.value.toLowerCase() || "";

    const typeFilter =
        document.getElementById("mc-filter-type-meals")?.value.toLowerCase() || "";

    const dateFilter =
        document.getElementById("mc-filter-date-meals")?.value || "";

    const searchFilter =
        document.getElementById("mc-search-meals")?.value.toLowerCase() || "";

    const rows =
        document.querySelectorAll("#mc-meals-table tbody tr");

    rows.forEach(row => {

        const className =
            row.cells[0]?.textContent.toLowerCase() || "";

        const studentName =
            row.cells[1]?.textContent.toLowerCase() || "";

        const mealType =
            row.cells[2]?.textContent.toLowerCase() || "";

        const mealDate =
            row.cells[3]?.textContent || "";

        const classMatch =
            !classFilter || className.includes(classFilter);

        const typeMatch =
            !typeFilter || mealType.includes(typeFilter);

        const dateMatch =
            !dateFilter || mealDate === dateFilter;

        const searchMatch =
            !searchFilter || studentName.includes(searchFilter);

        row.style.display =
            classMatch && typeMatch && dateMatch && searchMatch
                ? ""
                : "none";
    });
}


// ------------------ APPLY OTHER FILTERS ------------------
function applyOtherFilters() {

    const classFilter =
        document.getElementById("mc-filter-class-other")?.value.toLowerCase() || "";

    const typeFilter =
        document.getElementById("mc-filter-type-other")?.value.toLowerCase() || "";

    const dateFilter =
        document.getElementById("mc-filter-date-other")?.value || "";

    const searchFilter =
        document.getElementById("mc-search-other")?.value.toLowerCase() || "";

    const rows =
        document.querySelectorAll("#mc-other-table tbody tr");

    rows.forEach(row => {

        const className =
            row.cells[0]?.textContent.toLowerCase() || "";

        const studentName =
            row.cells[1]?.textContent.toLowerCase() || "";

        const chargeType =
            row.cells[2]?.textContent.toLowerCase() || "";

        const chargeDate =
            row.cells[3]?.textContent || "";

        const classMatch =
            !classFilter || className.includes(classFilter);

        const typeMatch =
            !typeFilter || chargeType.includes(typeFilter);

        const dateMatch =
            !dateFilter || chargeDate === dateFilter;

        const searchMatch =
            !searchFilter || studentName.includes(searchFilter);

        row.style.display =
            classMatch && typeMatch && dateMatch && searchMatch
                ? ""
                : "none";
    });
}
// ------------------ Search ------------------
function setupSearch(tableId, inputId) {
    const table = document.getElementById(tableId);
    const searchInput = document.getElementById(inputId);
    searchInput?.addEventListener("input", () => {
        const filter = searchInput.value.toLowerCase();
        Array.from(table.tBodies[0].rows).forEach(row => {
            const student = row.cells[1].textContent.toLowerCase();
            row.style.display = student.includes(filter) ? "" : "none";
        });
    });
}

setupSearch("mc-meals-table","mc-search-meals");
setupSearch("mc-other-table","mc-search-other");

// ------------------ Sorting ------------------
function setupSorting(tableId) {
    const table = document.getElementById(tableId);
    table.querySelectorAll("th[data-sort]").forEach(th => {
        let asc = true;
        th.style.cursor = "pointer";
        th.addEventListener("click", () => {
            const tbody = table.tBodies[0];
            const rows = Array.from(tbody.rows);
            const index = th.cellIndex;

            rows.sort((a,b) => {
                let valA = a.cells[index].textContent;
                let valB = b.cells[index].textContent;
                if(!isNaN(valA) && !isNaN(valB)) return asc ? valA - valB : valB - valA;
                return asc ? valA.localeCompare(valB) : valB.localeCompare(valA);
            });

            rows.forEach(r => tbody.appendChild(r));
            asc = !asc;
        });
    });
}

setupSorting("mc-meals-table");
setupSorting("mc-other-table");

// ------------------ TABLE PAGINATION ------------------

function setupPagination(tableId, rowsPerPage = 10) {

    const table = document.getElementById(tableId);

    if (!table) return;

    const tbody = table.querySelector("tbody");

    const paginationId = tableId + "-pagination";

    let pagination =
        document.getElementById(paginationId);

    // create pagination container if missing
    if (!pagination) {
        pagination = document.createElement("div");
        pagination.id = paginationId;
        pagination.className = "mc-pagination";
        table.parentNode.appendChild(pagination);
    }

    let currentPage = 1;

    function renderTable() {

        const rows =
            Array.from(tbody.querySelectorAll("tr"))
                .filter(row => row.style.display !== "none");

        const totalPages =
            Math.ceil(rows.length / rowsPerPage);

        rows.forEach((row, index) => {

            const start =
                (currentPage - 1) * rowsPerPage;

            const end =
                start + rowsPerPage;

            row.style.display =
                index >= start && index < end
                    ? ""
                    : "none";
        });

        renderPaginationButtons(totalPages);
    }

    function renderPaginationButtons(totalPages) {

        pagination.innerHTML = "";

        if (totalPages <= 1) return;

        for (let i = 1; i <= totalPages; i++) {

            const btn =
                document.createElement("button");

            btn.textContent = i;

            btn.className =
                i === currentPage
                    ? "mc-page-btn active"
                    : "mc-page-btn";

            btn.addEventListener("click", () => {
                currentPage = i;
                renderTable();
            });

            pagination.appendChild(btn);
        }
    }

    renderTable();

    return renderTable;
}

// setup pagination
const refreshMealsPagination =
    setupPagination("mc-meals-table", 10);

const refreshOtherPagination =
    setupPagination("mc-other-table", 10);

// ------------------ Export / Print ------------------
function exportTableToCSV(tableId, filename){
    const table = document.getElementById(tableId);
    let csv = [];
    Array.from(table.rows).forEach(row => {
        const cols = Array.from(row.cells).map(cell => `"${cell.textContent}"`);
        csv.push(cols.join(","));
    });
    const blob = new Blob([csv.join("\n")], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
}

function printTable(tableId) {
    const table = document.getElementById(tableId).outerHTML;
    const newWin = window.open("");
    newWin.document.write(`<html><head><title>Print</title></head><body>${table}</body></html>`);
    newWin.print();
}

document.getElementById("mc-export-meals")?.addEventListener("click", () => exportTableToCSV("mc-meals-table","meals.csv"));
document.getElementById("mc-print-meals")?.addEventListener("click", () => printTable("mc-meals-table"));
document.getElementById("mc-export-other")?.addEventListener("click", () => exportTableToCSV("mc-other-table","other-charges.csv"));
document.getElementById("mc-print-other")?.addEventListener("click", () => printTable("mc-other-table"));

// ------------------ Form Submissions ------------------
document.getElementById("mc-meal-form")?.addEventListener("submit", async function(e){
    e.preventDefault();
    const data = Object.fromEntries(new FormData(this).entries());
    data.receiptNumber = `MEAL-${Date.now()}-${Math.floor(Math.random()*1000)}`;

    try {
        await fetch("/api/meals", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        loadMeals(data.className); // refresh table
        this.reset();
        document.getElementById("mc-meal-modal")?.classList.remove("mc-show");
    } catch (err) {
        console.error("Error saving meal:", err);
    }
});

document.getElementById("mc-other-form")?.addEventListener("submit", async function(e){
    e.preventDefault();
    const data = Object.fromEntries(new FormData(this).entries());
    data.receiptNumber = `CHG-${Date.now()}-${Math.floor(Math.random()*1000)}`;

    try {
        await fetch("/api/other-charges", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        loadOtherCharges(data.className); // refresh table
        this.reset();
        document.getElementById("mc-other-modal")?.classList.remove("mc-show");
    } catch (err) {
        console.error("Error saving charge:", err);
    }
});
// ------------------ Dynamic Student Dropdowns ------------------

// Meals Modal: Populate students based on selected class
document.querySelector("#mc-meal-form select[name='className']")?.addEventListener("change", async function() {
    const className = this.value;
    const studentSelect = document.getElementById("mc-meal-student");
    if (!studentSelect) return;
    studentSelect.innerHTML = '<option value="">Loading...</option>';

    if (!className) {
        studentSelect.innerHTML = '<option value="">Select Student</option>';
        return;
    }

    try {
        const res = await fetch(`/api/students`);
        const data = await res.json();
        studentSelect.innerHTML = '<option value="">Select Student</option>';

        // Filter students by class
        data.forEach(student => {
            if (!student || !student.profile) return;
            const studentClass = student.profile.class || "";
            if (studentClass !== className) return; // only include students in selected class

            const studentName = student.name || "Unnamed";
            const opt = document.createElement("option");
            opt.value = studentName;
            opt.textContent = studentName;
            studentSelect.appendChild(opt);
        });
    } catch (err) {
        console.error("Error fetching students:", err);
        studentSelect.innerHTML = '<option value="">Error loading students</option>';
    }
});

// Other Charges Modal: Populate students based on selected class
document.querySelector("#mc-other-form select[name='className']")?.addEventListener("change", async function() {
    const className = this.value;
    const studentSelect = document.getElementById("mc-other-student");
    if (!studentSelect) return;
    studentSelect.innerHTML = '<option value="">Loading...</option>';

    if (!className) {
        studentSelect.innerHTML = '<option value="">Select Student</option>';
        return;
    }

    try {
        const res = await fetch(`/api/students`);
        const data = await res.json();
        studentSelect.innerHTML = '<option value="">Select Student</option>';

        data.forEach(student => {
            if (!student || !student.profile) return;
            const studentClass = student.profile.class || "";
            if (studentClass !== className) return; // filter by selected class

            const studentName = student.name || "Unnamed";
            const opt = document.createElement("option");
            opt.value = studentName;
            opt.textContent = studentName;
            studentSelect.appendChild(opt);
        });
    } catch (err) {
        console.error("Error fetching students:", err);
        studentSelect.innerHTML = '<option value="">Error loading students</option>';
    }
});

// ------------------ Initial Table Load ------------------
loadMeals();
loadOtherCharges();
