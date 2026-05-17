export function initAdminModal() {
  const trigger   = document.getElementById('admin-login-trigger');
  const modal     = document.getElementById('admin-login-modal');
  if (!trigger || !modal) return;

  const closeBtn  = document.getElementById('admin-modal-close');
  const submitBtn = document.getElementById('admin-modal-submit');
  const input     = document.getElementById('admin-modal-password');
  const errorEl   = document.getElementById('admin-modal-error');

  function openModal() {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    input.focus();
  }

  function closeModal() {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    input.value = '';
    errorEl.classList.add('hidden');
    errorEl.textContent = '';
  }

  trigger.addEventListener('click', (e) => { e.preventDefault(); openModal(); });
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') handleSubmit(); });
  submitBtn.addEventListener('click', handleSubmit);

  async function handleSubmit() {
    const password = input.value.trim();
    if (!password) { input.focus(); return; }

    submitBtn.textContent = 'Memeriksa...';
    submitBtn.disabled = true;
    errorEl.classList.add('hidden');

    try {
      const body = new FormData();
      body.append('password', password);
      const res  = await fetch('/admin/login-check.php', { method: 'POST', body });
      const data = await res.json();

      if (data.ok) {
        window.open('/admin/panel.php', '_blank', 'noopener');
        closeModal();
      } else {
        errorEl.textContent = data.msg || 'Password salah.';
        errorEl.classList.remove('hidden');
        input.value = '';
        input.focus();
      }
    } catch {
      errorEl.textContent = 'Tidak dapat terhubung ke server.';
      errorEl.classList.remove('hidden');
    } finally {
      submitBtn.textContent = 'Masuk';
      submitBtn.disabled = false;
    }
  }
}
