<script lang="ts">
	import SyncStatus from "$lib/components/SyncStatus.svelte";
</script>

<div class="container">
	<h2>Cloud Connection</h2>
	<p class="secondary">
		CouchDB database connection information for backup and synchronising data between devices.
	</p>
	<SyncStatus />
	<hr />
	<div class="container">
		<label>
			CouchDB Database Address:
			<input type="url" placeholder="https://example.com/spotter" />
		</label>

		<label>
			Database Username:
			<input type="text" placeholder="Username" />
		</label>

		<label>
			Database Password:
			<input type="password" placeholder="•••••••" />
		</label>
	</div>
</div>

<style lang="scss">
	.container {
		flex-direction: column;
		display: flex;
		gap: 10px;
	}

	.secondary {
		color: var(--bg-3);
	}

	hr {
		margin: 10px 0;
	}
</style>
