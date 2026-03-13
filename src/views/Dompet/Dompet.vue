<template>
  <div class="min-h-full bg-slate-50">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <!-- HEADER + BALANCE -->
      <section
        class="rounded-2xl bg-white shadow-sm border border-slate-100 p-4 sm:p-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
      >
        <div>
          <p
            class="text-xs font-semibold uppercase tracking-wide text-emerald-600"
          >
            Dompet Kuy Dinas
          </p>
          <h1 class="mt-1 text-xl sm:text-2xl font-semibold text-slate-800">
            Dompet &amp; Transaksi
          </h1>
          <p class="mt-1 text-xs sm:text-sm text-slate-600 max-w-xl">
            Top up koin untuk mengikuti tryout premium, membuka pembahasan
            lengkap, dan latihan sepuasnya di Kuy Dinas.
          </p>
        </div>

        <div
          class="rounded-2xl bg-emerald-50 border border-emerald-100 px-4 py-3 flex items-center gap-3 w-full sm:w-auto"
        >
          <div
            class="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white text-xl"
          >
            🪙
          </div>
          <div class="flex-1">
            <p class="text-[11px] text-emerald-700 font-medium">
              Saldo koin kamu
            </p>
            <p class="text-xl sm:text-2xl font-semibold text-emerald-900">
              {{ balance.toLocaleString("id-ID") }}
              <span class="text-xs font-normal">koin</span>
            </p>
            <p class="text-[11px] text-emerald-700">
              Cukup untuk sekitar {{ estimatedTryouts }}x tryout premium.
            </p>
          </div>
        </div>
      </section>

      <section
        v-if="walletMessage.text"
        class="rounded-2xl border px-4 py-3 text-sm shadow-sm"
        :class="
          walletMessage.type === 'success'
            ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
            : 'border-rose-200 bg-rose-50 text-rose-700'
        "
      >
        {{ walletMessage.text }}
      </section>

      <!-- EVENT PROMO -->
      <section
        class="rounded-2xl bg-emerald-500 text-white p-4 sm:p-5 shadow-sm flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
      >
        <div class="flex items-start gap-3">
          <div
            class="hidden sm:flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-2xl"
          >
            🎉
          </div>
          <div>
            <p
              class="text-[11px] font-semibold uppercase tracking-wide text-white"
            >
              Promo Event Spesial
            </p>
            <h2 class="text-base sm:text-lg font-semibold text-white">
              {{ promoEvent.title }}
            </h2>
            <p class="mt-1 text-xs sm:text-sm text-white max-w-xl">
              {{ promoEvent.description }}
            </p>
            <p class="mt-1 text-[11px] text-white">
              Berlaku sampai:
              <span class="font-semibold">{{ promoEvent.until }}</span>
            </p>
          </div>
        </div>

        <div class="flex flex-col items-start sm:items-end gap-2">
          <div
            class="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium text-white"
          >
            💸 Bonus hingga {{ promoEvent.maxBonus }} koin
          </div>
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-xl bg-white text-emerald-700 px-4 py-2 text-xs sm:text-sm font-semibold shadow-sm hover:bg-white/90"
          >
            Lihat paket promo
          </button>
        </div>
      </section>

      <!-- TOP UP PACKAGES -->
      <section class="space-y-3">
        <div class="flex items-center justify-between gap-2">
          <h2 class="text-sm font-semibold text-slate-800">
            Pilih Paket Top Up
          </h2>
          <p class="text-[11px] text-slate-500">
            Semakin besar paket, semakin hemat koin per rupiah.
          </p>
        </div>

        <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <article
            v-for="pkg in packages"
            :key="pkg.id"
            class="relative rounded-2xl border bg-white px-4 py-4 shadow-sm flex flex-col gap-3"
            :class="
              pkg.highlight
                ? 'border-emerald-300 ring-1 ring-emerald-200'
                : 'border-slate-100'
            "
          >
            <div class="flex items-start justify-between gap-2">
              <div>
                <p class="text-xs text-slate-500">Paket {{ pkg.id }}</p>
                <p class="mt-1 text-lg font-semibold text-slate-900">
                  {{ pkg.coins.toLocaleString("id-ID") }} koin
                </p>
              </div>
              <span
                v-if="pkg.tag"
                class="inline-flex items-center rounded-full px-2 py-[2px] text-[10px] font-semibold"
                :class="
                  pkg.tag === 'Paling hemat'
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-amber-100 text-amber-700'
                "
              >
                {{ pkg.tag }}
              </span>
            </div>

            <div class="text-xs text-slate-600">
              <p>
                Harga:
                <span class="font-semibold"
                  >Rp{{ pkg.price.toLocaleString("id-ID") }}</span
                >
              </p>
              <p v-if="pkg.bonus">
                Bonus:
                <span class="font-semibold"
                  >{{ pkg.bonus.toLocaleString("id-ID") }} koin</span
                >
              </p>
              <p
                v-if="pkg.effectiveRate"
                class="mt-1 text-[11px] text-slate-500"
              >
                ~ Rp{{ pkg.effectiveRate }}/100 koin
              </p>
            </div>

            <button
              type="button"
              class="mt-auto inline-flex items-center justify-center rounded-xl bg-emerald-500 px-3 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-slate-300"
              :disabled="topupSubmittingId === pkg.id"
              @click="handleSelectPackage(pkg)"
            >
              {{
                topupSubmittingId === pkg.id
                  ? "Memproses..."
                  : `Top Up Paket ${pkg.id}`
              }}
            </button>
          </article>
        </div>

        <p class="mt-1 text-[11px] text-slate-500">
          Setelah memilih paket, pembayaran akan dibuka melalui Midtrans Snap.
        </p>
      </section>

      <!-- REDEEM TRYOUT -->
      <section class="space-y-3">
        <div class="flex items-center justify-between gap-2">
          <div>
            <h2 class="text-sm font-semibold text-slate-800">
              Tukar Koin dengan Tryout
            </h2>
            <p class="text-[11px] text-slate-500">
              Gunakan saldo koin untuk membuka tryout premium yang belum kamu
              miliki.
            </p>
          </div>
          <button
            type="button"
            class="text-[11px] font-semibold text-emerald-600 hover:underline"
            @click="refreshWalletData"
          >
            Muat ulang
          </button>
        </div>

        <div
          v-if="redeemLoading"
          class="rounded-2xl border border-slate-100 bg-white px-4 py-6 text-sm text-slate-500 shadow-sm"
        >
          Memuat tryout yang bisa ditukar...
        </div>

        <div
          v-else-if="redeemError"
          class="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-6 text-sm text-rose-600 shadow-sm"
        >
          {{ redeemError }}
        </div>

        <div
          v-else-if="redeemTryouts.length === 0"
          class="rounded-2xl border border-slate-100 bg-white px-4 py-6 text-sm text-slate-500 shadow-sm"
        >
          Belum ada tryout premium yang bisa ditukar saat ini.
        </div>

        <div v-else class="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          <article
            v-for="tryout in redeemTryouts"
            :key="tryout.id"
            class="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
          >
            <div class="flex items-start justify-between gap-3">
              <div>
                <p
                  class="text-xs font-semibold uppercase tracking-wide text-amber-600"
                >
                  Tryout Premium
                </p>
                <h3 class="mt-1 text-base font-semibold text-slate-900">
                  {{ tryout.title }}
                </h3>
              </div>
              <span
                class="rounded-full px-2.5 py-1 text-[10px] font-semibold"
                :class="
                  tryout.canRedeem
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-rose-100 text-rose-700'
                "
              >
                {{ tryout.canRedeem ? "Saldo cukup" : "Saldo kurang" }}
              </span>
            </div>

            <dl class="mt-4 space-y-2 text-xs text-slate-600">
              <div class="flex items-center justify-between gap-3">
                <dt>Harga tukar</dt>
                <dd class="font-semibold text-slate-900">
                  {{ tryout.price.toLocaleString("id-ID") }} koin
                </dd>
              </div>
              <div class="flex items-center justify-between gap-3">
                <dt>Durasi</dt>
                <dd>{{ tryout.duration }} menit</dd>
              </div>
              <div class="flex items-center justify-between gap-3">
                <dt>Jumlah soal</dt>
                <dd>{{ tryout.questionCount }} soal</dd>
              </div>
            </dl>

            <button
              type="button"
              class="mt-4 inline-flex w-full items-center justify-center rounded-xl px-4 py-2 text-xs font-semibold transition"
              :class="
                tryout.canRedeem
                  ? 'bg-amber-400 text-slate-900 hover:bg-amber-500'
                  : 'cursor-not-allowed bg-slate-200 text-slate-500'
              "
              :disabled="!tryout.canRedeem || redeemSubmittingId === tryout.id"
              @click="handleRedeemTryout(tryout)"
            >
              {{
                redeemSubmittingId === tryout.id
                  ? "Memproses..."
                  : tryout.canRedeem
                    ? "Tukar dengan Koin"
                    : "Koin Tidak Cukup"
              }}
            </button>
          </article>
        </div>
      </section>

      <!-- TRANSACTION HISTORY -->
      <section
        class="rounded-2xl bg-white shadow-sm border border-slate-100 px-4 py-4 sm:px-5 sm:py-5 space-y-3"
      >
        <div class="flex items-center justify-between gap-2">
          <h2 class="text-sm font-semibold text-slate-800">
            Riwayat Transaksi
          </h2>
          <button
            type="button"
            class="text-[11px] text-emerald-600 hover:underline"
          >
            Lihat semua
          </button>
        </div>

        <div v-if="walletLoading" class="text-xs text-slate-500 italic">
          Loading riwayat transaksi...
        </div>

        <div
          v-else-if="transactions.length === 0"
          class="text-xs text-slate-500 italic"
        >
          Belum ada transaksi koin.
        </div>

        <ul v-else class="divide-y divide-slate-100 text-xs sm:text-sm">
          <li
            v-for="tx in transactions"
            :key="tx.id"
            class="flex items-center justify-between py-2"
          >
            <div>
              <p class="font-medium text-slate-800">
                {{ tx.amountLabel }}
              </p>
              <p class="text-[11px] text-slate-500">
                {{ tx.description }} • {{ tx.date }}
              </p>
            </div>
            <p
              class="text-xs font-semibold"
              :class="tx.amount >= 0 ? 'text-emerald-700' : 'text-rose-600'"
            >
              {{ tx.amount >= 0 ? "+" : "-"
              }}{{ Math.abs(tx.amount).toLocaleString("id-ID") }} koin
            </p>
          </li>
        </ul>
      </section>

      <!-- FOOTER NOTE -->
      <section class="text-[11px] text-slate-400 text-center pb-2">
        Koin Kuy Dinas hanya dapat digunakan untuk layanan di platform Kuy Dinas
        dan tidak dapat diuangkan kembali.
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import api from "../../services/api";

const balance = ref(0);
const walletLoading = ref(true);
const redeemSubmittingId = ref(null);
const topupSubmittingId = ref(null);
const walletMessage = ref({
  type: "success",
  text: "",
});
const midtransClientKey = import.meta.env.VITE_MIDTRANS_CLIENT_KEY || "";
const midtransSnapUrl =
  import.meta.env.VITE_MIDTRANS_SNAP_URL ||
  "https://app.sandbox.midtrans.com/snap/snap.js";

const estimatedTryouts = computed(() => {
  // asumsi 1 tryout premium ~ 8000 koin
  return Math.max(1, Math.round(balance.value / 8000));
});

// Promo event (bisa diganti sesuai event berjalan)
const promoEvent = {
  title: "Promo Akhir Tahun Kuy Dinas",
  description:
    "Top up minimal 20.000 koin dan dapatkan bonus koin hingga 30% untuk semua paket tryout SKD.",
  until: "31 Desember 2025",
  maxBonus: 5500,
};

// Paket top up (dummy, ganti dengan data backend kalau sudah siap)
const packages = [
  {
    id: 1,
    coins: 100,
    price: 10000,
    bonus: 0,
    tag: "Coba dulu",
    highlight: false,
    effectiveRate: 10000,
  },
  {
    id: 2,
    coins: 250,
    price: 20000,
    bonus: 50,
    tag: "Favorit",
    highlight: true,
    effectiveRate: 8000,
  },
  {
    id: 3,
    coins: 400,
    price: 30000,
    bonus: 120,
    tag: "Paling hemat",
    highlight: true,
    effectiveRate: 7500,
  },
  {
    id: 4,
    coins: 550,
    price: 40000,
    bonus: 200,
    tag: "Paling hemat",
    highlight: false,
    effectiveRate: 7273,
  },
];

const transactions = ref([]);

const router = useRouter();
const redeemTryouts = ref([]);
const redeemLoading = ref(false);
const redeemError = ref("");

const showWalletMessage = (text, type = "success") => {
  walletMessage.value = { text, type };
};

const loadMidtransSnapScript = () =>
  new Promise((resolve, reject) => {
    if (window.snap) {
      resolve(window.snap);
      return;
    }

    const existingScript = document.querySelector(
      'script[data-midtrans-snap="true"]',
    );

    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(window.snap), {
        once: true,
      });
      existingScript.addEventListener(
        "error",
        () => reject(new Error("Gagal memuat script Midtrans Snap.")),
        { once: true },
      );
      return;
    }

    if (!midtransClientKey) {
      reject(
        new Error(
          "VITE_MIDTRANS_CLIENT_KEY belum diatur. Tambahkan dulu ke file .env.",
        ),
      );
      return;
    }

    const script = document.createElement("script");
    script.src = midtransSnapUrl;
    script.dataset.midtransSnap = "true";
    script.dataset.clientKey = midtransClientKey;
    script.setAttribute("data-client-key", midtransClientKey);
    script.onload = () => resolve(window.snap);
    script.onerror = () =>
      reject(new Error("Gagal memuat script Midtrans Snap."));

    document.head.appendChild(script);
  });

const formatDateTime = (value) => {
  if (!value) {
    return "-";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

const normalizeTransaction = (item) => {
  const rawAmount = Number(item.amount || 0);
  const isExpense =
    String(item.type || "").toLowerCase() === "redeem_tryout" || rawAmount < 0;
  const amount = isExpense ? -Math.abs(rawAmount) : Math.abs(rawAmount);
  const absoluteAmount = Math.abs(amount);

  return {
    id: item.id,
    type: item.type || "-",
    amount,
    amountLabel: `${amount >= 0 ? "+" : "-"}${absoluteAmount.toLocaleString("id-ID")} koin`,
    description: item.description || item.type || "Transaksi koin",
    date: formatDateTime(item.created_at),
  };
};

const loadWallet = async () => {
  walletLoading.value = true;

  try {
    const response = await api.get("/wallet");
    const source = response.data?.data || {};

    balance.value = Number(source.balance || 0);
    transactions.value = Array.isArray(source.transactions)
      ? source.transactions.map(normalizeTransaction)
      : [];
  } catch (error) {
    console.error("Gagal memuat dompet:", error);
    showWalletMessage(
      error?.response?.data?.message || "Data dompet belum bisa dimuat.",
      "error",
    );
  } finally {
    walletLoading.value = false;
  }
};

const loadRedeemTryouts = async () => {
  redeemLoading.value = true;
  redeemError.value = "";

  try {
    const response = await api.get("/wallet/redeemable-tryouts");
    const tryoutList = Array.isArray(response.data?.data)
      ? response.data.data
      : [];

    redeemTryouts.value = tryoutList
      .map((item) => ({
        id: item.id,
        title: item.title,
        price: Number(item.price || 0),
        duration: item.duration || 0,
        questionCount:
          item.questionCount ||
          Number(item.twk_target || 0) +
            Number(item.tiu_target || 0) +
            Number(item.tkp_target || 0),
        type: item.type || "premium",
        canRedeem: balance.value >= Number(item.price || 0),
      }))
      .sort((a, b) => a.price - b.price);
  } catch (error) {
    console.error("Gagal memuat tryout redeem:", error);
    redeemError.value =
      error?.response?.data?.message ||
      "Tryout premium untuk penukaran koin belum bisa dimuat.";
  } finally {
    redeemLoading.value = false;
  }
};

const refreshWalletData = async () => {
  walletMessage.value.text = "";
  await loadWallet();
  await loadRedeemTryouts();
};

const openMidtransSnap = async (snapToken) => {
  const snap = await loadMidtransSnapScript();

  return new Promise((resolve, reject) => {
    snap.pay(snapToken, {
      onSuccess: async () => {
        await refreshWalletData();
        showWalletMessage(
          "Pembayaran berhasil diproses. Saldo dompet telah diperbarui.",
          "success",
        );
        resolve();
      },
      onPending: () => {
        showWalletMessage(
          "Pembayaran sedang menunggu konfirmasi. Silakan cek status transaksi.",
          "success",
        );
        resolve();
      },
      onError: () => {
        reject(new Error("Pembayaran Midtrans gagal diproses."));
      },
      onClose: () => {
        showWalletMessage(
          "Popup pembayaran ditutup. Kamu bisa mencoba lagi kapan saja.",
          "error",
        );
        resolve();
      },
    });
  });
};

const handleSelectPackage = async (pkg) => {
  topupSubmittingId.value = pkg.id;
  walletMessage.value.text = "";

  try {
    const response = await api.post("/wallet/topup/create", {
      package_id: pkg.id,
    });
    const source = response.data?.data || {};

    if (source.snap_token) {
      await openMidtransSnap(source.snap_token);
      return;
    }

    if (source.redirect_url) {
      window.location.href = source.redirect_url;
      return;
    }

    throw new Error("Backend tidak mengembalikan snap_token atau redirect_url.");
  } catch (error) {
    console.error("Gagal membuat transaksi top up:", error);
    showWalletMessage(
      error?.response?.data?.message ||
        error.message ||
        "Top up belum bisa diproses.",
      "error",
    );
  } finally {
    topupSubmittingId.value = null;
  }
};

const handleRedeemTryout = async (tryout) => {
  redeemSubmittingId.value = tryout.id;
  walletMessage.value.text = "";

  try {
    const response = await api.post(`/wallet/redeem-tryout/${tryout.id}`);
    const source = response.data?.data || {};

    balance.value = Number(source.remaining_balance ?? balance.value);
    redeemTryouts.value = redeemTryouts.value.filter(
      (item) => String(item.id) !== String(tryout.id),
    );
    showWalletMessage(
      response.data?.message || "Tryout berhasil ditukar dengan koin.",
      "success",
    );

    await loadWallet();

    router.push({
      name: "panduan-tryout",
      params: { id: tryout.id },
      query: {
        title: tryout.title,
        category: "SKD CPNS",
        tag: "premium",
        via: "coin-redemption",
      },
    });
  } catch (error) {
    console.error("Gagal redeem tryout:", error);

    if (error?.response?.status === 422) {
      showWalletMessage(
        error.response.data?.message || "Redeem tryout gagal.",
        "error",
      );
      return;
    }

    showWalletMessage(
      error?.response?.data?.message || "Terjadi kendala saat redeem tryout.",
      "error",
    );
  } finally {
    redeemSubmittingId.value = null;
  }
};

onMounted(() => {
  refreshWalletData();
});
</script>
