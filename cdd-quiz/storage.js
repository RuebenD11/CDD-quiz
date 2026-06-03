// storage.js — Persistence layer (localStorage; swap this module to change backend).
// Profiles + per-question SRS stats + session log + error book + exam history.

(function () {
  "use strict";

  const PROFILES_KEY = "cdd-profiles";
  const ACTIVE_PROFILE_KEY = "cdd-active-profile";
  let _prefix = "";

  function statsKey()    { return _prefix + "cdd-stats-v1"; }
  function sessionsKey() { return _prefix + "cdd-sessions-v1"; }
  function errorsKey()   { return _prefix + "cdd-errors-v1"; }
  function examKey()     { return _prefix + "cdd-exams-v1"; }
  function prefsKey()    { return _prefix + "cdd-prefs-v1"; }
  function streakKey()   { return _prefix + "cdd-streak"; }
  function lastDayKey()  { return _prefix + "cdd-last-day"; }
  function settingsKey() { return _prefix + "cdd-settings-v1"; }

  const MAX_SESSIONS = 300;
  const MAX_ERRORS = 250;

  function defaultStats(id, topic) {
    return {
      id, topic: topic || null,
      attempts: 0, correct: 0, incorrect: 0,
      lastSeen: null, lastConfidence: null, lastScoreFrac: null,
      ease: 2.5, reps: 0, interval: 0, due: null, lapses: 0,
      recentResults: [], // booleans, last 10
    };
  }

  function load(key, fallback) {
    try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; }
    catch (e) { return fallback; }
  }
  function save(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* swallow */ }
  }

  const Storage = {
    // --- Profiles ---
    getProfiles() { return load(PROFILES_KEY, []); },
    addProfile(name) {
      const profiles = load(PROFILES_KEY, []);
      const id = name.toLowerCase().replace(/[^a-z0-9]/g, "-") + "-" + Math.random().toString(36).slice(2, 6);
      profiles.push({ id, name, created: Date.now() });
      save(PROFILES_KEY, profiles);
      return id;
    },
    deleteProfile(id) {
      save(PROFILES_KEY, load(PROFILES_KEY, []).filter((p) => p.id !== id));
      const prefix = "p_" + id + "_";
      const toRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith(prefix)) toRemove.push(k);
      }
      toRemove.forEach((k) => localStorage.removeItem(k));
      if (Storage.getActiveProfileId() === id) localStorage.removeItem(ACTIVE_PROFILE_KEY);
    },
    setActiveProfile(id) { localStorage.setItem(ACTIVE_PROFILE_KEY, id); _prefix = "p_" + id + "_"; },
    getActiveProfileId() { return localStorage.getItem(ACTIVE_PROFILE_KEY) || null; },
    getPrefix() { return _prefix; },

    prefsKey, streakKey, lastDayKey, settingsKey,

    // --- Per-question stats ---
    getStats(id, topic) { const m = load(statsKey(), {}); return m[id] || defaultStats(id, topic); },
    getAllStats() { return load(statsKey(), {}); },
    setStats(id, stats) { const m = load(statsKey(), {}); m[id] = stats; save(statsKey(), m); },

    // --- Sessions ---
    recordSession(session) {
      const arr = load(sessionsKey(), []);
      arr.push(session);
      save(sessionsKey(), arr.length > MAX_SESSIONS ? arr.slice(-MAX_SESSIONS) : arr);
    },
    getSessions() { return load(sessionsKey(), []); },

    // --- Error book ---
    addError(entry) {
      const arr = load(errorsKey(), []);
      arr.unshift(entry);
      save(errorsKey(), arr.length > MAX_ERRORS ? arr.slice(0, MAX_ERRORS) : arr);
    },
    getErrors() { return load(errorsKey(), []); },
    setErrors(arr) { save(errorsKey(), arr); },
    clearErrors() { save(errorsKey(), []); },

    // --- Exam history ---
    recordExam(entry) { const arr = load(examKey(), []); arr.push(entry); save(examKey(), arr); },
    getExams() { return load(examKey(), []); },

    // --- Settings (API key, model, behaviour) ---
    getSettings() {
      return Object.assign(
        { apiKey: "", apiModel: "claude-sonnet-4-6", askProbe: true, confidenceEnabled: true, autoGrade: true },
        load(settingsKey(), {})
      );
    },
    setSettings(s) { save(settingsKey(), s); },

    resetAll() {
      [statsKey(), sessionsKey(), errorsKey(), examKey()].forEach((k) => {
        try { localStorage.removeItem(k); } catch (e) {}
      });
    },

    migrateUnprefixedData(profileId) {
      const prefix = "p_" + profileId + "_";
      ["cdd-stats-v1", "cdd-sessions-v1", "cdd-errors-v1", "cdd-exams-v1", "cdd-prefs-v1", "cdd-streak", "cdd-last-day", "cdd-settings-v1"]
        .forEach((k) => {
          const val = localStorage.getItem(k);
          if (val && !localStorage.getItem(prefix + k)) {
            localStorage.setItem(prefix + k, val);
            localStorage.removeItem(k);
          }
        });
    },

    defaultStats,
  };

  window.CDDStorage = Storage;
})();
