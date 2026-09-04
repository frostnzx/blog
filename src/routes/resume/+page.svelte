<script lang="ts">
	const fileId = '1rtfBp2CBE619K1C_Ef8VM-nFme6jOVYX';

	const previewUrl = `https://drive.google.com/file/d/${fileId}/preview`;
	const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
</script>

<div class="flex flex-row gap-5">
	<iframe src={previewUrl} width="70%" height="850" title="PDF preview" />

	<div class="flex flex-1 items-center justify-center">
		<a href={downloadUrl} target="_blank" rel="noopener noreferrer" class="text-center underline">
			Download PDF
		</a>
	</div>
</div>
