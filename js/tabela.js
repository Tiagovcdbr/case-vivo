document.addEventListener("DOMContentLoaded", loadUsers);

let userToEditIndex = null;
let userToDeleteIndex = null;

function loadUsers() {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const userTable = document.getElementById("userTable");

  userTable.innerHTML = users
    .map(
      (user, index) => `
            <tr>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.profile}</td>
                <td>${user.whatsapp}</td>
                <td>
                    <button class="btn btn-sm btn-warning" onclick="editUser(${index})">Editar</button>
                    <button class="btn btn-sm btn-danger" onclick="showDeleteModal(${index})">Excluir</button>
                </td>
            </tr>
        `
    )
    .join("");
}

function editUser(index) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users[index];
  userToEditIndex = index;

  // Preenche os campos do modal com os dados do usuário
  document.getElementById("editName").value = user.name;
  document.getElementById("editEmail").value = user.email;
  document.getElementById("editProfile").value = user.profile;
  document.getElementById("editWhatsapp").value = user.whatsapp;

  // Exibe o modal
  const editModal = new bootstrap.Modal(document.getElementById("editModal"));
  editModal.show();
}

// Salvar alterações do modal
document.getElementById("saveEdit").addEventListener("click", () => {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  if (userToEditIndex !== null) {
    users[userToEditIndex] = {
      name: document.getElementById("editName").value.trim(),
      email: document.getElementById("editEmail").value.trim(),
      profile: document.getElementById("editProfile").value,
      whatsapp: document.getElementById("editWhatsapp").value.trim(),
    };

    localStorage.setItem("users", JSON.stringify(users));
    loadUsers();

    // Fecha o modal
    const editModal = bootstrap.Modal.getInstance(
      document.getElementById("editModal")
    );
    editModal.hide();
  }
});

// Exibir modal de confirmação de exclusão
function showDeleteModal(index) {
  userToDeleteIndex = index;

  // Exibe o modal de confirmação de exclusão
  const deleteModal = new bootstrap.Modal(
    document.getElementById("deleteConfirmModal")
  );
  deleteModal.show();
}

// Confirmar exclusão do usuário
document.getElementById("confirmDelete").addEventListener("click", () => {
  if (userToDeleteIndex !== null) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.splice(userToDeleteIndex, 1);
    localStorage.setItem("users", JSON.stringify(users));
    loadUsers();

    // Fecha o modal de exclusão
    const deleteModal = bootstrap.Modal.getInstance(
      document.getElementById("deleteConfirmModal")
    );
    deleteModal.hide();

    // Exibe o modal de sucesso
    const successModal = new bootstrap.Modal(
      document.getElementById("successModal")
    );
    successModal.show();
  }
});
