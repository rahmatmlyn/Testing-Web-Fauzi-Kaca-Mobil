export function initAdminModal() {
  const trigger = document.getElementById('admin-login-trigger');
  const modal   = document.getElementById('admin-login-modal');
  if (!trigger || !modal) return;

  const closeBtn = document.getElementById('admin-modal-close');
  const input    = document.getElementById('admin-modal-password');
  const form     = document.getElementById('admin-modal-form');

  function openModal() {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    setTimeout(() => input?.focus(), 50);
  }

  function closeModal() {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    if (input) input.value = '';
  }

  trigger.addEventListener('click', (e) => { e.preventDefault(); openModal(); });
  closeBtn?.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  // Tutup modal setelah form submit (tab baru sudah terbuka)
  form?.addEventListener('submit', () => {
    setTimeout(closeModal, 300);
  });
}
