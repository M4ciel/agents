ALTER TABLE "audio_chunks" DROP CONSTRAINT "audio_chunks_question_id_questions_id_fk";
--> statement-breakpoint
ALTER TABLE "audio_chunks" DROP COLUMN "question_id";